import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./middleware/session";

export async function proxy(request: NextRequest) {
  verifySession(request);

  return NextResponse.next();
}

// Only run the proxy on protected route groups
export const config = { matcher: ["/dashboard/:path*"] };
