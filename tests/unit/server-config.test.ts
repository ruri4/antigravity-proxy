import { describe, expect, test } from "bun:test";
import { getPublicOrigin, getServerPort } from "../../src/server-config";

describe("server configuration", () => {
  test("uses a valid configured port", () => {
    expect(getServerPort("8080")).toBe(8080);
  });

  test("rejects invalid ports", () => {
    expect(() => getServerPort("0")).toThrow();
    expect(() => getServerPort("invalid")).toThrow();
  });

  test("uses forwarded client origin when no public URL is configured", () => {
    const request = new Request("http://internal:8080/oauth/start", {
      headers: {
        "x-forwarded-host": "proxy.example.com",
        "x-forwarded-proto": "https"
      }
    });

    expect(getPublicOrigin(request, "")).toBe("https://proxy.example.com");
  });

  test("uses the configured public URL when provided", () => {
    const request = new Request("http://internal:8080/oauth/start");
    expect(getPublicOrigin(request, "https://proxy.example.com/path")).toBe("https://proxy.example.com");
  });
});
