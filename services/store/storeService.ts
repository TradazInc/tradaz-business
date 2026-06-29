import { AuthClient, authClient } from "@/lib/auth";

class StoreService {
  constructor(private readonly authClient: AuthClient) {}

  async getStores(organizationId: string) {
    return this.authClient.organization.listTeams({
      query: { organizationId },
    });
  }

  async setActiveStore(teamId: string) {
    return this.authClient.organization.setActiveTeam({ teamId });
  }
}

export const storeService = new StoreService(authClient);
