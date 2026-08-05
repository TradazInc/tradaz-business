import { authClient } from "@/lib/authClient";

export async function setActiveStore(teamId: string | null) {
  return authClient.organization.setActiveTeam({ teamId });
}

export async function getStores(organizationId: string) {
  return authClient.organization.listTeams({ query: { organizationId } });
}
