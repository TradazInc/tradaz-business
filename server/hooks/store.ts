import { SESSION_KEY, storeKey } from "@/utilities/cacheKeys";
import { authClient } from "@/lib/authClient";
import { StoreData } from "@/schema/store";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useStores = (organizationId?: string) => {
  return useSWR(organizationId ? storeKey(organizationId) : null, () =>
    authClient.organization.listTeams({
      query: { organizationId },
      fetchOptions: { throw: true },
    }),
  );
};

export const useAddStore = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? storeKey(organizationId) : null,
    (url: string, { arg }: { arg: StoreData }) =>
      authClient.organization.createTeam({
        ...arg,
        organizationId,
        fetchOptions: { throw: true },
      }),
  );
};

export const useSetActiveStore = () => {
  return useSWRMutation(
    SESSION_KEY,
    (url: string, { arg }: { arg: { teamId: string | null } }) =>
      authClient.organization.setActiveTeam({
        ...arg,
        fetchOptions: { throw: true },
      }),
  );
};
