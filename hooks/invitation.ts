import { INVITATION_KEY } from "@/data/cacheKeys";
import { authClient, authConfig } from "@/lib/authClient";
import { CreateInvitationInputData } from "@/schema/invitation";
import { getScopedKey } from "@/utilities/computeKey";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useInvitations = (organizationId: string | undefined) => {
  return useSWR(getScopedKey(INVITATION_KEY, organizationId), ([key, query]) =>
    authClient.organization.listInvitations({
      query: { organizationId },
      fetchOptions: authConfig,
    }),
  );
};

export const useInvitation = (id: string) => {
  return useSWR(getScopedKey(INVITATION_KEY, id), () =>
    authClient.organization.getInvitation({
      query: { id },
      fetchOptions: authConfig,
    }),
  );
};

export const useCancelInvitation = (organizationId: string | undefined) => {
  return useSWRMutation(
    getScopedKey(INVITATION_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      authClient.organization.cancelInvitation({
        invitationId: arg,
        fetchOptions: authConfig,
      }),
  );
};

export const useSendInvitation = (organizationId: string | undefined) => {
  return useSWRMutation(
    getScopedKey(INVITATION_KEY, organizationId),
    (key, { arg }: { arg: CreateInvitationInputData }) =>
      authClient.organization.inviteMember({
        ...arg,
        resend: true,
        fetchOptions: authConfig,
      }),
  );
};
