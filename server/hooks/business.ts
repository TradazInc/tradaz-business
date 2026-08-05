import { ORGANIZATIONS_KEY } from "@/data/swrCacheKeys";
import { authClient } from "@/lib/authClient";
import { BusinessData } from "@/schema/business";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useBusinesses = () => {
  return useSWR(ORGANIZATIONS_KEY, () =>
    authClient.organization
      .list({ fetchOptions: { throw: true } })
      .then((res) => res),
  );
};

export const useBusiness = (organizationId?: string) => {
  return useSWR(
    organizationId ? `/api/organizations/${organizationId}` : null,
    () =>
      authClient.organization
        .getFullOrganization({
          query: { organizationId, membersLimit: 100 },
          fetchOptions: { throw: true },
        })
        .then((res) => res),
  );
};

export const useAddBusiness = () => {
  return useSWRMutation(
    ORGANIZATIONS_KEY,
    (url: string, { arg }: { arg: BusinessData }) =>
      authClient.organization.create({
        ...arg,
        metadata: { phone: arg.phone, address: arg.address },
        keepCurrentActiveOrganization: false,
      }),
  );
};
