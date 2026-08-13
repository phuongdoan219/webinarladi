import assert from "node:assert/strict";
import test from "node:test";

import register from "../api/register.js";

function createResponse() {
  return {
    headers: {},
    statusCode: 200,
    payload: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
    end() {
      return this;
    },
  };
}

test("warms the Google Sheet connection before the form is submitted", async () => {
  const originalFetch = globalThis.fetch;
  let warmRequest;
  globalThis.fetch = async (_url, options) => {
    warmRequest = options;
    return { status: 302 };
  };

  try {
    const response = createResponse();
    await register({ method: "GET", headers: {} }, response);

    assert.equal(response.statusCode, 204);
    assert.equal(warmRequest.method, "GET");
    assert.equal(response.headers["Cache-Control"], "no-store");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("forwards a valid registration to Google Sheets", async () => {
  const originalFetch = globalThis.fetch;
  let forwardedBody;
  globalThis.fetch = async (_url, options) => {
    forwardedBody = options.body;
    return { status: 302 };
  };

  try {
    const response = createResponse();
    await register(
      {
        method: "POST",
        headers: { origin: "https://webinarladi.vercel.app" },
        body: {
          session: "thu-5",
          parentName: "Phụ huynh thử",
          phone: "0900000000",
          email: "test@example.com",
          expectation: "Hiểu con hơn",
          eventId: "lead-test-123",
          attribution: { utm_source: "facebook", utm_campaign: "webinar-test" },
        },
      },
      response,
    );

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.payload, { ok: true });
    assert.equal(forwardedBody.get("phone"), "'0900000000");
    assert.equal(forwardedBody.get("eventId"), "lead-test-123");
    assert.equal(forwardedBody.get("utm_source"), "facebook");
    assert.equal(forwardedBody.get("utm_campaign"), "webinar-test");
    assert.equal(forwardedBody.get("utmSource"), "facebook");
    assert.equal(forwardedBody.get("utmCampaign"), "webinar-test");
    assert.equal(forwardedBody.get("landingPage"), "https://webinarladi.vercel.app/");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("sends a deduplicated Lead event to Meta CAPI without exposing raw contact data", async () => {
  const originalFetch = globalThis.fetch;
  const originalPixelId = process.env.META_PIXEL_ID;
  const originalToken = process.env.META_CAPI_ACCESS_TOKEN;
  process.env.META_PIXEL_ID = "123456789012345";
  process.env.META_CAPI_ACCESS_TOKEN = "test-secret-token";
  let metaRequest;

  globalThis.fetch = async (url, options) => {
    if (String(url).includes("graph.facebook.com")) {
      metaRequest = { url: String(url), options };
      return { ok: true, status: 200 };
    }
    return { ok: true, status: 302 };
  };

  try {
    const response = createResponse();
    await register(
      {
        method: "POST",
        headers: {
          origin: "https://webinar.teencare.vn",
          "user-agent": "TeenCare test browser",
          "x-forwarded-for": "203.0.113.10",
        },
        body: {
          session: "chu-nhat",
          parentName: "Test Parent",
          phone: "0900000000",
          email: "parent@example.com",
          expectation: "Understand the webinar",
          eventId: "lead-dedup-123",
          attribution: { fbclid: "facebook-click-id" },
          metaBrowser: {
            fbp: "fb.1.1234567890.browser-id",
            fbc: "fb.1.1234567890.facebook-click-id",
            sourceUrl: "https://webinar.teencare.vn/?utm_source=facebook",
          },
        },
      },
      response,
    );

    const payload = JSON.parse(metaRequest.options.body);
    const [lead] = payload.data;
    assert.equal(response.statusCode, 200);
    assert.equal(metaRequest.options.headers.Authorization, "Bearer test-secret-token");
    assert.equal(lead.event_name, "Lead");
    assert.equal(lead.event_id, "lead-dedup-123");
    assert.equal(lead.action_source, "website");
    assert.equal(lead.user_data.client_ip_address, "203.0.113.10");
    assert.match(lead.user_data.ph[0], /^[a-f0-9]{64}$/);
    assert.match(lead.user_data.em[0], /^[a-f0-9]{64}$/);
    assert.doesNotMatch(metaRequest.options.body, /0900000000|parent@example\.com/);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalPixelId === undefined) delete process.env.META_PIXEL_ID;
    else process.env.META_PIXEL_ID = originalPixelId;
    if (originalToken === undefined) delete process.env.META_CAPI_ACCESS_TOKEN;
    else process.env.META_CAPI_ACCESS_TOKEN = originalToken;
  }
});

test("recovers missing UTM fields from the landing page URL", async () => {
  const originalFetch = globalThis.fetch;
  let forwardedBody;
  globalThis.fetch = async (_url, options) => {
    forwardedBody = options.body;
    return { status: 302 };
  };

  try {
    const response = createResponse();
    await register(
      {
        method: "POST",
        headers: { origin: "https://webinar.teencare.vn" },
        body: {
          session: "chu-nhat",
          parentName: "UTM fallback test",
          phone: "0900000000",
          expectation: "Verify attribution fallback",
          attribution: {},
          metaBrowser: {
            sourceUrl: "https://webinar.teencare.vn/?utm_source=FB&utm_medium=CVS&utm_campaign=webinar&utm_term=Phuong&utm_content=TC91&fbclid=test-click-id",
          },
        },
      },
      response,
    );

    assert.equal(response.statusCode, 200);
    assert.equal(forwardedBody.get("utm_source"), "FB");
    assert.equal(forwardedBody.get("utm_medium"), "CVS");
    assert.equal(forwardedBody.get("utm_campaign"), "webinar");
    assert.equal(forwardedBody.get("utm_term"), "Phuong");
    assert.equal(forwardedBody.get("utm_content"), "TC91");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects an incomplete registration", async () => {
  const response = createResponse();
  await register(
    {
      method: "POST",
      headers: { origin: "https://webinarladi.vercel.app" },
      body: { session: "thu-5" },
    },
    response,
  );

  assert.equal(response.statusCode, 400);
  assert.equal(response.payload.ok, false);
});
