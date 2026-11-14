import { NextRequest } from "next/server";
import { verifySession } from "./middleware/session";
import { subdomainRedirect } from "./middleware/subdomain";

export async function proxy(request: NextRequest) {
  return subdomainRedirect(request) ?? verifySession(request);
}

/*
 * Match all paths except for:
 * 1. /api routes
 * 2. /_next (Next.js internals)
 * 3. all root files inside /public (e.g. /favicon.ico)
 */
export const config = { matcher: ["/((?!api|_next|[\\w-]+\\.\\w+).*)"] };
