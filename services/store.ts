import { toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/authClient";
import { StoreData } from "@/schema/store";

export async function setActiveStore(teamId: string) {
  return authClient.organization.setActiveTeam({ teamId });
}

export async function getStores(organizationId: string) {
  return authClient.organization.listTeams({ query: { organizationId } });
}

export async function createStore(store: StoreData) {
  const { data, error } = await authClient.organization.createTeam(store);

  if (error) {
    toaster.create({
      title: error.code,
      description: error.message,
      type: "error",
    });
    return;
  }

  return data;
}
