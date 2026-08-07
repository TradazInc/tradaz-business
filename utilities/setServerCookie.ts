import { RequestContext } from "@better-fetch/fetch";

export async function setServerCookie<T extends Record<string, any>>(
  context: RequestContext<T>,
) {
  if (typeof window === "undefined") {
    const { headers } = await import("next/headers");

    const header = await headers();
    const cookie = header.get("cookie");
    if (cookie) context.headers.set("cookie", cookie);
  }
  return context;
}
