// Same-host path from ?next= (set by the proxy); rejects "//evil.com" and absolute URLs
export function destination(redirectTo: string) {
  const next = new URLSearchParams(window.location.search).get("next");
  return next?.startsWith("/") && !next.startsWith("//") ? next : redirectTo;
}
