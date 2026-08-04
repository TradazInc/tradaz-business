import { authClient } from "@/lib/authClient";
import useSWR from "swr";

export const useStores = (organizationId?: string) => {
  return useSWR(
    organizationId ? `/api/organization/${organizationId}/stores` : null,
    () => authClient.organization.listTeams().then((res) => res.data),
  );
};
