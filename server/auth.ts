import { authClient, authConfig } from "@/lib/authClient";
import { hasRole } from "@/utilities/hasRole";
import { forbidden, unauthorized } from "next/navigation";
import { cache } from "react";

export async function getSession() {
  return authClient.getSession();
}

export const getRole = cache(
  async (query: { organizationId: string } | { organizationSlug: string }) => {
    try {
      const { role } = await authClient.organization.getActiveMemberRole({
        query,
        fetchOptions: authConfig,
      });
      return role;
    } catch {
      return null; // not a member
    }
  },
);

export const requireSession = cache(async () => {
  const { data, error } = await getSession();
  if (!data || error) unauthorized();

  return data;
});

export async function requireAdmin() {
  const session = await requireSession();
  if (!hasRole(session.user.role, "admin")) forbidden();

  return session;
}

export async function requireRole(
  query: { organizationId: string } | { organizationSlug: string },
  allow: (role: string) => boolean,
) {
  const session = await requireSession();
  const role = await getRole(query);

  if (!role || !allow(role)) forbidden();

  return { session, role };
}
