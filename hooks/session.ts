import { SESSION_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import { CustomSession } from "@/schema/session";
import { cache } from "@/utilities/cacheKey";
import { updateSession } from "@/utilities/updateSession";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useSession = () => {
  return useSWR(cache.key(SESSION_KEY), () =>
    authClient.getSession({ fetchOptions: authConfig }),
  );
};

export const useSetActiveBusiness = () => {
  const mutation = useSWRMutation(
    cache.key(SESSION_KEY),
    (key, { arg }: { arg?: string }) =>
      authClient.organization.setActive({
        organizationId: arg ?? null,
        fetchOptions: authConfig,
      }),
  );

  const trigger = (businessId?: string) =>
    mutation.trigger<CustomSession>(businessId, {
      optimisticData: updateSession({
        activeOrganizationId: businessId ?? null,
        activeTeamId: null, // switching brand clears the store
      }),
      rollbackOnError: true,
    });

  return { ...mutation, trigger };
};

export const useSetActiveStore = () => {
  const mutation = useSWRMutation(
    cache.key(SESSION_KEY),
    (key, { arg }: { arg?: string }) =>
      authClient.organization.setActiveTeam({
        teamId: arg ?? null,
        fetchOptions: authConfig,
      }),
  );

  const trigger = (storeId?: string) =>
    mutation.trigger<CustomSession>(storeId, {
      optimisticData: updateSession({ activeTeamId: storeId ?? null }),
      rollbackOnError: true,
    });

  return { ...mutation, trigger };
};
