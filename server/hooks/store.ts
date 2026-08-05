import { authClient } from "@/lib/authClient";
import { StoreData } from "@/schema/store";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useStores = (organizationId?: string) => {
  return useSWR(
    organizationId ? `/api/organizations/${organizationId}/stores` : null,
    () =>
      authClient.organization
        .listTeams({ query: { organizationId }, fetchOptions: { throw: true } })
        .then((res) => res),
  );
};

export const useAddStore = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? `/api/organization/${organizationId}/stores` : null,
    (url: string, { arg }: { arg: StoreData }) =>
      authClient.organization.createTeam(arg),
  );
};
