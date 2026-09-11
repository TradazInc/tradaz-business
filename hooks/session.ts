import { SESSION_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import { getKey } from "@/utilities/computeKey";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useSession = () => {
  return useSWR(getKey(SESSION_KEY), () =>
    authClient.getSession({ fetchOptions: authConfig }),
  );
};

export const useSetActiveBusiness = () => {
  return useSWRMutation(getKey(SESSION_KEY), (key, { arg }: { arg?: string }) =>
    authClient.organization.setActive({
      organizationId: arg ?? null,
      fetchOptions: authConfig,
    }),
  );
};

export const useSetActiveStore = () => {
  return useSWRMutation(getKey(SESSION_KEY), (key, { arg }: { arg?: string }) =>
    authClient.organization.setActiveTeam({
      teamId: arg ?? null,
      fetchOptions: authConfig,
    }),
  );
};
