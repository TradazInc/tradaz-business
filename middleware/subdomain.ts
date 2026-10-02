import { extractSubdomain } from "@/utilities/extractSubdomain";
import { NextRequest, NextResponse } from "next/server";

export function subdomainRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Block access to admin page from subdomains
    if (pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // For the root path on a subdomain, rewrite to the subdomain page
    if (pathname === "/") {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }
  }
}
