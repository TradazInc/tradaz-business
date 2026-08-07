import { authClient } from "@/lib/authClient";

export async function getStores(organizationId: string) {
  return authClient.organization.listTeams({ query: { organizationId } });
}
