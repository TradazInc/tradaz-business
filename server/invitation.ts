import { authClient, authConfig } from "@/lib/authClient";

export async function getInvitations(organizationId?: string) {
  return authClient.organization.listInvitations({
    query: { organizationId },
    fetchOptions: authConfig,
  });
}
