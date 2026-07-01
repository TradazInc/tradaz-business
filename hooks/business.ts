import { authClient } from "@/lib/auth";
import useSWR from "swr";

export const useBusinesses = () => {
  return authClient.useListOrganizations();
};

export const useBusiness = (organizationId?: string) => {
  return useSWR(`/api/organization/${organizationId}`, () =>
    authClient.organization.getFullOrganization(),
  );
};
