import { ORGANIZATIONS_KEY } from "@/data/swrCacheKeys";
import { authClient } from "@/lib/authClient";
import useSWR from "swr";

export const useBusinesses = () => {
  return useSWR(ORGANIZATIONS_KEY, () =>
    authClient.organization.list().then((res) => res.data),
  );
};

export const useBusiness = (organizationId?: string) => {
  return useSWR(
    organizationId ? `/api/organization/${organizationId}` : null,
    () => authClient.organization.getFullOrganization().then((res) => res.data),
  );
};
