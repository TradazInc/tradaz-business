import { organizationsEndpoint } from "@/data/swrEndpoints";
import { authClient } from "@/lib/auth";
import useSWR from "swr";

export const useBusinesses = () => {
  return useSWR(organizationsEndpoint, () =>
    authClient.organization.list().then((res) => res.data),
  );
};

export const useBusiness = (organizationId?: string) => {
  return useSWR(`/api/organization/${organizationId}`, () =>
    authClient.organization.getFullOrganization().then((res) => res.data),
  );
};
