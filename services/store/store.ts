import { authClient } from "@/lib/auth";

export async function setActiveStore(teamId: string) {
  return authClient.organization.setActiveTeam({ teamId });
}
