import { waitUntil } from "@vercel/functions";

const GOOGLE_SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzIgh6GqiIxGafiPnyY-XyctL5HsOcMFxDI-C7VQmygOV2NyHuAJMbsU-H7eeG3aAq2_Q/exec";

const SESSION_VALUES = new Set(["thu-5", "chu-nhat", "ca-2"]);
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];
const ALLOWED_ORIGINS = new Set([
  "https://webinarladi.vercel.app",
  "https://webinar.teencare.vn",
]);

function getHeader(request, name) {
  if (typeof request.headers?.get === "function") return request.headers.get(name) || "";
  const key = Object.keys(request.headers || {}).find((header) => header.toLowerCase() === name.toLowerCase());
  return key ? String(request.headers[key] || "") : "";
}

async function sha256(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function normalizePhone(value) {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("0")) return `84${digits.slice(1)}`;
  return digits;
}

function getSafeSourceUrl(value, origin) {
  try {
    const url = new URL(value);
    return ALLOWED_ORIGINS.has(url.origin) ? url.href.slice(0, 500) : `${origin || "https://webinar.teencare.vn"}/`;
  } catch {
    return `${origin || "https://webinar.teencare.vn"}/`;
  }
}

function getAttributionFromUrl(value) {
  try {
    const url = new URL(value);
    const params = new URLSearchParams(url.search);
    const pathQuery = url.pathname.replace(/^\/+/, "");
    if (/^(?:utm_(?:source|medium|campaign|content|term)|fbclid|gclid)=/i.test(pathQuery)) {
      const pathParams = new URLSearchParams(pathQuery);
      params.forEach((paramValue, key) => pathParams.set(key, paramValue));
      return Object.fromEntries(
        ATTRIBUTION_KEYS.map((key) => [key, clean(pathParams.get(key), 250)]),
      );
    }

    return Object.fromEntries(
      ATTRIBUTION_KEYS.map((key) => [key, clean(params.get(key), 250)]),
    );
  } catch {
    return Object.fromEntries(ATTRIBUTION_KEYS.map((key) => [key, ""]));
  }
}

async function sendMetaLead({ request, session, phone, email, eventId, metaBrowser }) {
  const pixelId = clean(process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID, 20);
  const accessToken = String(process.env.META_CAPI_ACCESS_TOKEN || "").trim();
  if (!/^\d{5,20}$/.test(pixelId) || !accessToken || !eventId) return false;

  const userData = {};
  const normalizedPhone = normalizePhone(phone);
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedPhone) userData.ph = [await sha256(normalizedPhone)];
  if (normalizedEmail) userData.em = [await sha256(normalizedEmail)];

  const forwardedFor = getHeader(request, "x-forwarded-for").split(",")[0].trim();
  const userAgent = getHeader(request, "user-agent").slice(0, 500);
  const fbp = clean(metaBrowser?.fbp, 250);
  const fbc = clean(metaBrowser?.fbc, 250);
  if (forwardedFor) userData.client_ip_address = forwardedFor;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  const origin = getHeader(request, "origin");
  const payload = {
    data: [{
      event_name: "Lead",
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url: getSafeSourceUrl(metaBrowser?.sourceUrl, origin),
      action_source: "website",
      user_data: userData,
      custom_data: {
        content_name: "TeenCare Webinar",
        content_category: session,
        currency: "VND",
        value: 0,
      },
    }],
  };

  const testEventCode = String(process.env.META_TEST_EVENT_CODE || "").trim();
  if (testEventCode) payload.test_event_code = testEventCode;

  const graphVersion = /^v\d+\.\d+$/.test(process.env.META_GRAPH_API_VERSION || "")
    ? process.env.META_GRAPH_API_VERSION
    : "v23.0";
  const metaResponse = await fetch(`https://graph.facebook.com/${graphVersion}/${pixelId}/events`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000),
  });

  if (!metaResponse.ok) throw new Error(`Meta CAPI rejected the event (${metaResponse.status})`);
  return true;
}

async function scheduleMetaLead(payload) {
  const task = sendMetaLead(payload).catch((error) => {
    console.warn("Meta CAPI delivery failed", error instanceof Error ? error.message : error);
  });

  if (process.env.VERCEL === "1") {
    waitUntil(task);
    return;
  }

  // Local development and unit tests do not provide Vercel's request context.
  // Await there so behavior stays deterministic; production runs it in the background.
  await task;
}

function clean(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export default async function handler(request, response) {
  const origin = request.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return response.status(403).json({ ok: false, error: "Origin not allowed" });
  }

  if (request.method === "GET") {
    try {
      await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
      });
    } catch {
      // Warming is best-effort; form submission still performs the real check.
    }

    response.setHeader("Cache-Control", "no-store");
    return response.status(204).end();
  }

  if (request.method !== "POST") {
    response.setHeader("Allow", "GET, POST");
    return response.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = typeof request.body === "string" ? JSON.parse(request.body) : request.body || {};
  const session = clean(body.session, 20);
  const parentName = clean(body.parentName, 120);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 160);
  const expectation = clean(body.expectation, 1500);
  const eventId = clean(body.eventId, 100);
  const metaBrowser = {
    fbp: clean(body.metaBrowser?.fbp, 250),
    fbc: clean(body.metaBrowser?.fbc, 250),
    sourceUrl: clean(body.metaBrowser?.sourceUrl, 500),
  };
  const landingPage = getSafeSourceUrl(metaBrowser.sourceUrl, origin);
  const urlAttribution = getAttributionFromUrl(landingPage);
  const attribution = Object.fromEntries(
    ATTRIBUTION_KEYS.map((key) => [
      key,
      clean(body.attribution?.[key], 250) || urlAttribution[key],
    ]),
  );

  if (!SESSION_VALUES.has(session) || !parentName || !phone || !expectation) {
    return response.status(400).json({ ok: false, error: "Thiếu thông tin bắt buộc" });
  }

  try {
    const payload = new URLSearchParams({
      session,
      parentName,
      phone: `'${phone}`,
      email,
      expectation,
      eventId,
      landingPage,
      utmSource: attribution.utm_source,
      utmMedium: attribution.utm_medium,
      utmCampaign: attribution.utm_campaign,
      utmContent: attribution.utm_content,
      utmTerm: attribution.utm_term,
      ...attribution,
    });

    const sheetResponse = await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: payload,
      redirect: "manual",
    });

    if (![200, 302, 303].includes(sheetResponse.status)) {
      throw new Error(`Google Sheet rejected the request (${sheetResponse.status})`);
    }

    await scheduleMetaLead({ request, session, phone, email, eventId, metaBrowser });

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Registration delivery failed", error);
    return response.status(502).json({ ok: false, error: "Không thể lưu đăng ký" });
  }
}
