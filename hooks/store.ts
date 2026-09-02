import { STORE_KEY } from "@/data/cacheKeys";
import { authClient } from "@/lib/authClient";
import { StoreData } from "@/schema/store";
import { getScopedKey } from "@/utilities/computeKey";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useStores = (organizationId: string | undefined) => {
  return useSWR(getScopedKey(STORE_KEY, organizationId), () =>
    authClient.organization.listTeams({
      query: { organizationId },
      fetchOptions: { throw: true },
    }),
  );
};

export const useAddStore = (organizationId: string | undefined) => {
  return useSWRMutation(
    getScopedKey(STORE_KEY, organizationId),
    (key, { arg }: { arg: StoreData }) =>
      authClient.organization.createTeam({
        ...arg,
        organizationId,
        fetchOptions: { throw: true },
      }),
  );
};

export const useRemoveStore = (organizationId: string | undefined) => {
  return useSWRMutation(
    getScopedKey(STORE_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      authClient.organization.removeTeam({ teamId: arg, organizationId }),
  );
};
