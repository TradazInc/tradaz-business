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
