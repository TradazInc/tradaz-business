import { extractSubdomain } from "@/utilities/extractSubdomain";
import { NextRequest, NextResponse } from "next/server";
import { protocol, rootDomain } from "../ini/configs";

const ROOT_ONLY = ["/overwatch", "/dashboard", "/portal"];

export function subdomainRedirect(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Redirect to admin/business/staff page from subdomains (eg shop.root.com/signin reaches the real sign-in page)
    if (ROOT_ONLY.some((p) => pathname.startsWith(p)))
      return NextResponse.redirect(
        `${protocol}://${rootDomain}${pathname}${search}`,
      );

    // Omit the root slash so the storefront root becomes /storefront/{subdomain}, while nested paths are preserved.
    const path = pathname === "/" ? "" : pathname;

    return NextResponse.rewrite(
      new URL(`/storefront/${subdomain}${path}${search}`, request.url),
    );
  }
}
