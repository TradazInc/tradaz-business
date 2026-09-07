import { INVITATION_KEY } from "@/data/cacheKeys";
import { authClient } from "@/lib/authClient";
import { InvitationData } from "@/schema/invitation";
import { getScopedKey } from "@/utilities/computeKey";
import useSWR from "swr";
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
    authClient.organization.getInvitation({
      query: { id },
      fetchOptions: { throw: true },
    }),
  );
};

export const useCancelInvitation = (organizationId: string | undefined) => {
  return useSWRMutation(
    getScopedKey(INVITATION_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      authClient.organization.cancelInvitation({
        invitationId: arg,
        fetchOptions: { throw: true },
      }),
  );
};

export const useSendInvitation = (organizationId: string | undefined) => {
  return useSWRMutation(
    getScopedKey(INVITATION_KEY, organizationId),
    (key, { arg }: { arg: InvitationData }) =>
      authClient.organization.inviteMember({
        ...arg,
        resend: true,
        fetchOptions: { throw: true },
      }),
  );
};
