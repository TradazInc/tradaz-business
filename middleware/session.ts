import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

const SECTIONS = [
  { prefix: "/overwatch", signin: "/overwatch/signin" },
  { prefix: "/portal", signin: "/portal/signin" },
  { prefix: "/dashboard", signin: "/dashboard/signin" },
];

export function verifySession(request: NextRequest) {
  // Optimistic cookie check (Fast & non-blocking)
  const { pathname, search } = request.nextUrl;

  // "/portal" or "/portal/..." but not "/portalx"
  const section = SECTIONS.find(
    (s) => pathname === s.prefix || pathname.startsWith(`${s.prefix}/`),
  );

  // Sign-in pages are public, otherwise they'd redirect to themselves
  if (section && pathname !== section.signin && !getSessionCookie(request)) {
    const url = new URL(section.signin, request.url);

    // save user webpage for redirect after signin
    url.searchParams.set("next", pathname + search);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
