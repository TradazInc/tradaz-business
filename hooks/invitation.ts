import { INVITATION_KEY } from "@/data/cacheKeys";
import { authClient } from "@/lib/authClient";
import { InvitationData } from "@/schema/invitation";
import { getKey, getScopedKey } from "@/utilities/computeKey";
import useSWR, { unstable_serialize, useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const useInvitations = (organizationId: string | undefined) => {
  return useSWR(getScopedKey(INVITATION_KEY, organizationId), ([key, query]) =>
    authClient.organization.listInvitations({
      query: { organizationId },
      fetchOptions: { throw: true },
    }),
  );
};

export const useInvitation = (id: string) => {
  return useSWR(getScopedKey(INVITATION_KEY, id), () =>
    authClient.organization.getInvitation({ query: { id } }),
  );
};

export const useCancelInvitation = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getKey(INVITATION_KEY),
    (key, { arg }: { arg: string }) =>
      authClient.organization.cancelInvitation({
        invitationId: arg,
        fetchOptions: { throw: true },
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getScopedKey(INVITATION_KEY, organizationId)),
        ),
    },
  );
};

export const useSendInvitation = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getKey(INVITATION_KEY),
    (key, { arg }: { arg: InvitationData }) =>
      authClient.organization.inviteMember({
        ...arg,
        resend: true,
        fetchOptions: { throw: true },
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getScopedKey(INVITATION_KEY, organizationId)),
        ),
    },
  );
};
