import { authClient } from "@/lib/authClient";
import useSWR from "swr";

export const useStores = (organizationId: string) => {
  return useSWR(`/api/organization/${organizationId}/stores`, () =>
    authClient.organization.listTeams().then((res) => res.data),
  );
};
