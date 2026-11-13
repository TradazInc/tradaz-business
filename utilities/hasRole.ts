import { protocol, rootDomain } from "@/ini/configs";
import { CustomSession } from "@/schema/session";

export function hasRole(role: string | null | undefined, name: string) {
  return (
    !!role &&
    role
      .split(",")
      .map((r) => r.trim())
      .includes(name)
  );
}

export function storefrontUrl(slug: string, path = "/") {
  return `${protocol}://${slug}.${rootDomain}${path}`;
}

/** Where this session belongs. Returns a path, or an absolute URL for customers. */
export function userHome(session: CustomSession, slug?: string) {
  if (hasRole(session.user.role, "admin")) return "/overwatch";

  const member = session.member;
  if (!member || hasRole(member.role, "owner")) return "/dashboard";
  if (hasRole(member.role, "customer") && slug) return storefrontUrl(slug);
  return `/portal/${member.organizationId}`;
}
