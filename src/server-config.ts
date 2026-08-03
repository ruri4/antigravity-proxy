const DEFAULT_PORT = 3000;

export function getServerPort(value = process.env.PORT): number {
  if (!value) return DEFAULT_PORT;

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  return port;
}

export function getServerHost(value = process.env.HOST): string {
  return value || "0.0.0.0";
}

export function getPublicOrigin(request: Request, baseUrl = process.env.BASE_URL): string {
  if (baseUrl) return new URL(baseUrl).origin;

  const requestUrl = new URL(request.url);
  const protocol = request.headers.get("x-forwarded-proto")?.split(",")[0].trim()
    || requestUrl.protocol.slice(0, -1);
  const host = request.headers.get("x-forwarded-host")?.split(",")[0].trim()
    || request.headers.get("host")
    || requestUrl.host;

  return new URL(`${protocol}://${host}`).origin;
}
