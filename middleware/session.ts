import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export function verifySession(request: NextRequest) {
  // Optimistic cookie check (Fast & non-blocking)
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie)
    return NextResponse.redirect(new URL("/signin", request.url));
}
