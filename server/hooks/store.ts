import { authClient } from "@/lib/authClient";
import { StoreData } from "@/schema/store";
import { STORE_KEY } from "@/utilities/cacheKeys";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useStores = (organizationId?: string) => {
  return useSWR(organizationId ? [STORE_KEY, organizationId] : null, () =>
    authClient.organization.listTeams({
      query: { organizationId },
      fetchOptions: { throw: true },
    }),
  );
};

export const useAddStore = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? [STORE_KEY, organizationId] : null,
    (key, { arg }: { arg: StoreData }) =>
      authClient.organization.createTeam({
        ...arg,
        organizationId,
        fetchOptions: { throw: true },
      }),
  );
};
