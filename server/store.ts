import { authClient, authConfig } from "@/lib/authClient";

export async function getStores(organizationId: string) {
  return authClient.organization.listTeams({
    query: { organizationId },
    fetchOptions: authConfig,
  });
}
