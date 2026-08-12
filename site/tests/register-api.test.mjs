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
        },
      },
      response,
    );

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.payload, { ok: true });
    assert.equal(forwardedBody.get("phone"), "'0900000000");
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
