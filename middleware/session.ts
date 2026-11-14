import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const PROTECTED = ["/overwatch", "/dashboard", "/portal"];

export function verifySession(request: NextRequest) {
  // Optimistic cookie check (Fast & non-blocking)
  const { pathname, search } = request.nextUrl;

  if (
    PROTECTED.some((p) => pathname.startsWith(p)) &&
    !getSessionCookie(request)
  ) {
    const url = new URL("/signin", request.url);

    // save user webpage for redirect after signin
    url.searchParams.set("next", pathname + search);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
