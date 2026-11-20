// Subdomains used by the platform; a business slug becomes {slug}.tradaz.com, so these can't be taken
export const RESERVED_SLUGS = new Set([
  "api",
  "www",
  "app",
  "admin",
  "overwatch",
  "dashboard",
  "portal",
  "auth",
  "mail",
  "email",
  "static",
  "cdn",
  "assets",
  "docs",
  "status",
  "support",
  "help",
  "blog",
]);

export function isReservedSlug(slug: string) {
  return RESERVED_SLUGS.has(slug.trim().toLowerCase());
}
