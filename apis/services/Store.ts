import { authClient } from "@/lib/authClient";
import { StoreData } from "@/schema/store";

export async function setActiveStore(teamId: string | null) {
  return authClient.organization.setActiveTeam({ teamId });
}

export async function getStores(organizationId: string) {
  return authClient.organization.listTeams({ query: { organizationId } });
}

export async function createStore(store: StoreData) {
  return authClient.organization.createTeam(store);
}
