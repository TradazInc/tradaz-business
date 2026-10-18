import { STORE_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import { CreateStoreInputData, GetAllStoresOutputData } from "@/schema/store";
import { cache } from "@/utilities/cacheKey";
import useSWR, { SWRConfiguration } from "swr";
import useSWRMutation from "swr/mutation";

export const useStores = (
  organizationId: string | undefined,
  config?: SWRConfiguration<GetAllStoresOutputData, Error>,
) => {
  return useSWR(
    cache.scopedKey(STORE_KEY, organizationId),
    () =>
      authClient.organization.listTeams({
        query: { organizationId },
        fetchOptions: authConfig,
      }),
    config,
  );
};

export const useAddStore = (organizationId: string | undefined) => {
  const mutation = useSWRMutation(
    cache.scopedKey(STORE_KEY, organizationId),
    (key, { arg }: { arg: CreateStoreInputData }) =>
      authClient.organization.createTeam({
        ...arg,
        organizationId,
        fetchOptions: authConfig,
      }),
    { populateCache: true, revalidate: true },
  );

  const trigger = (data: CreateStoreInputData) =>
    mutation.trigger<GetAllStoresOutputData>(data, {
      populateCache: (created, current = []) => [
        ...current,
        { ...created, category: null },
      ],
    });

  return { ...mutation, trigger };
};

export const useRemoveStore = (organizationId: string | undefined) => {
  return useSWRMutation(
    cache.scopedKey(STORE_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      authClient.organization.removeTeam({
        teamId: arg,
        organizationId,
        fetchOptions: authConfig,
      }),
  );
};
