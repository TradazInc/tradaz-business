import { authClient } from "@/lib/authClient";
import { SESSION_KEY } from "@/data/cacheKeys";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getKey } from "@/utilities/computeKey";

export const useSession = () => {
  return useSWR(getKey(SESSION_KEY), () =>
    authClient.getSession({ fetchOptions: { throw: true } }),
  );
};

export const useSetActiveBusiness = () => {
  return useSWRMutation(getKey(SESSION_KEY), (key, { arg }: { arg?: string }) =>
    authClient.organization.setActive({
      organizationId: arg ?? null,
      fetchOptions: { throw: true },
    }),
  );
};

export const useSetActiveStore = () => {
  return useSWRMutation(getKey(SESSION_KEY), (key, { arg }: { arg?: string }) =>
    authClient.organization.setActiveTeam({
      teamId: arg ?? null,
      fetchOptions: { throw: true },
    }),
  );
};
