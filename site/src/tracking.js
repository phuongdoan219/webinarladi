const GTM_ID = import.meta.env.VITE_GTM_ID?.trim();
const GA4_ID = import.meta.env.VITE_GA4_ID?.trim();
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID?.trim();

const VALID_GTM_ID = /^GTM-[A-Z0-9]+$/i.test(GTM_ID || "") ? GTM_ID : "";
const VALID_GA4_ID = /^G-[A-Z0-9]+$/i.test(GA4_ID || "") ? GA4_ID : "";
const VALID_META_PIXEL_ID = /^\d{5,20}$/.test(META_PIXEL_ID || "") ? META_PIXEL_ID : "";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
];

function loadScript(id, src) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function rememberAttribution() {
  const params = new URLSearchParams(window.location.search);
  const attribution = Object.fromEntries(
    ATTRIBUTION_KEYS.flatMap((key) => {
      const value = params.get(key)?.slice(0, 250);
      return value ? [[key, value]] : [];
    }),
  );

  if (Object.keys(attribution).length) {
    try {
      sessionStorage.setItem("teencare_attribution", JSON.stringify(attribution));
    } catch {
      // Tracking must never block the landing page when storage is unavailable.
    }
  }
}

export function getAttribution() {
  try {
    return JSON.parse(sessionStorage.getItem("teencare_attribution") || "{}") || {};
  } catch {
    return {};
  }
}

function readCookie(name) {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)).slice(0, 250) : "";
}

export function getMetaBrowserData() {
  const attribution = getAttribution();
  const fbp = readCookie("_fbp");
  const storedFbc = readCookie("_fbc");
  const fbc = storedFbc || (attribution.fbclid ? `fb.1.${Date.now()}.${attribution.fbclid}` : "");

  return {
    fbp,
    fbc,
    sourceUrl: window.location.href.slice(0, 500),
  };
}

function initGoogleTracking() {
  window.dataLayer = window.dataLayer || [];

  if (VALID_GTM_ID) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(
      "teencare-gtm",
      `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(VALID_GTM_ID)}`,
    );
    return;
  }

  // Direct GA4 is a fallback. When GTM is present, configure GA4 inside GTM
  // so the same page view is not counted twice.
  if (VALID_GA4_ID) {
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", VALID_GA4_ID, { send_page_view: true });
    loadScript(
      "teencare-ga4",
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(VALID_GA4_ID)}`,
    );
  }
}

function initMetaPixel() {
  if (!VALID_META_PIXEL_ID || window.fbq) return;

  const fbq = function fbq() {
    if (fbq.callMethod) fbq.callMethod.apply(fbq, arguments);
    else fbq.queue.push(arguments);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  loadScript("teencare-meta-pixel", "https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", VALID_META_PIXEL_ID);
  window.fbq("track", "PageView");
}

export function initTracking() {
  rememberAttribution();
  initGoogleTracking();
  initMetaPixel();
}

export function trackRegistrationCta(source) {
  const payload = {
    event: "registration_cta_click",
    cta_source: source,
    ...getAttribution(),
  };
  if (VALID_GTM_ID) window.dataLayer?.push(payload);
  else if (VALID_GA4_ID) window.gtag?.("event", "registration_cta_click", payload);
  window.fbq?.("trackCustom", "RegistrationCtaClick", { cta_source: source });
}

export function trackLead({ session, eventId }) {
  const payload = {
    event: "generate_lead",
    event_id: eventId,
    webinar_session: session,
    currency: "VND",
    value: 0,
    ...getAttribution(),
  };

  if (VALID_GTM_ID) window.dataLayer?.push(payload);
  else if (VALID_GA4_ID) window.gtag?.("event", "generate_lead", payload);
  window.fbq?.(
    "track",
    "Lead",
    { content_name: "TeenCare Webinar", content_category: session, currency: "VND", value: 0 },
    { eventID: eventId },
  );
}

export function createEventId() {
  return globalThis.crypto?.randomUUID?.() || `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const trackingStatus = {
  gtm: Boolean(VALID_GTM_ID),
  ga4Direct: Boolean(!VALID_GTM_ID && VALID_GA4_ID),
  meta: Boolean(VALID_META_PIXEL_ID),
};
