import { authClient } from "@/lib/authClient";
import { SESSION_KEY } from "@/utilities/cacheKeys";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useSession = () => {
  return useSWR([SESSION_KEY], () =>
    authClient.getSession({ fetchOptions: { throw: true } }),
  );
};

export const useSetActiveBusiness = () => {
  return useSWRMutation([SESSION_KEY], (key, { arg }: { arg?: string }) =>
    authClient.organization.setActive({
      organizationId: arg ?? null,
      fetchOptions: { throw: true },
    }),
  );
};

export const useSetActiveStore = () => {
  return useSWRMutation([SESSION_KEY], (key, { arg }: { arg?: string }) =>
    authClient.organization.setActiveTeam({
      teamId: arg ?? null,
      fetchOptions: { throw: true },
    }),
  );
};
