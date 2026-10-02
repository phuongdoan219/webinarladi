import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

test("browser sends CompleteRegistration with the shared event ID and keeps GA4 generate_lead", async () => {
  const source = await readFile(new URL("../src/tracking.js", import.meta.url), "utf8");
  const pixelCalls = [];
  const googleCalls = [];
  const context = vm.createContext({
    URL, URLSearchParams,
    sessionStorage: { getItem: () => null },
    window: {
      location: { href: "https://webinar.teencare.vn/", pathname: "/", search: "" },
      fbq: (...args) => pixelCalls.push(args),
      gtag: (...args) => googleCalls.push(args),
    },
  });
  vm.runInContext(source.replaceAll("import.meta.env", '({ VITE_GA4_ID: "G-TEST123", VITE_META_PIXEL_ID: "123456789" })')
    .replaceAll("export ", ""), context);
  assert.equal(pixelCalls.length, 0);
  vm.runInContext('trackCompleteRegistration({ session: "thu-5", eventId: "registration-test-123" })', context);
  assert.equal(pixelCalls.length, 1);
  assert.equal(pixelCalls[0][0], "track");
  assert.equal(pixelCalls[0][1], "CompleteRegistration");
  assert.equal(pixelCalls[0][3].eventID, "registration-test-123");
  assert.equal(googleCalls[0][1], "generate_lead");
  assert.equal(googleCalls[0][2].event_id, "registration-test-123");
});
