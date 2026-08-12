const GOOGLE_SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzeAKxlB4RbHMQWoEJFbAAI71bDgVs4vyaKh-zEgMIpvp7oDhWBzlxJa_mrQVus9UY/exec";

const SESSION_VALUES = new Set(["thu-5", "chu-nhat", "ca-2"]);
const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];
const ALLOWED_ORIGINS = new Set([
  "https://webinarladi.vercel.app",
  "https://webinar.teencare.vn",
]);

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
  const attribution = Object.fromEntries(
    ATTRIBUTION_KEYS.map((key) => [key, clean(body.attribution?.[key], 250)]),
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

    return response.status(200).json({ ok: true });
  } catch (error) {
    console.error("Registration delivery failed", error);
    return response.status(502).json({ ok: false, error: "Không thể lưu đăng ký" });
  }
}
