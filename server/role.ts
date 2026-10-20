import { authClient, authConfig } from "@/lib/authClient";

export async function getRoles(organizationId?: string) {
  return authClient.organization.listRoles({
    query: { organizationId },
    fetchOptions: authConfig,
  });
}
