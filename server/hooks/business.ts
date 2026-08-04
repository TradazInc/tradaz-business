import { organizationsKey } from "@/data/cacheKeys";
import { authClient } from "@/lib/authClient";
import useSWR from "swr";

export const useBusinesses = () => {
  return useSWR(organizationsKey, () =>
    authClient.organization.list().then((res) => res.data),
  );
};

export const useBusiness = (organizationId?: string) => {
  return useSWR(
    organizationId ? `/api/organization/${organizationId}` : null,
    () => authClient.organization.getFullOrganization().then((res) => res.data),
  );
};
