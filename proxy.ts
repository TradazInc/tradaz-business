import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./middleware/session";

export async function proxy(request: NextRequest) {
  return verifySession(request) ?? NextResponse.next();
}

// Only run the proxy on protected route groups
export const config = { matcher: ["/dashboard/:path*"] };
