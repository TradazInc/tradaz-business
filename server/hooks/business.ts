import { businessKey, BUSINESS_KEY, SESSION_KEY } from "@/utilities/cacheKeys";
import { authClient } from "@/lib/authClient";
import { BusinessData } from "@/schema/business";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useBusinesses = () => {
  return useSWR(BUSINESS_KEY, () =>
    authClient.organization.list({ fetchOptions: { throw: true } }),
  );
};

export const useBusiness = (organizationId?: string) => {
  return useSWR(organizationId ? businessKey(organizationId) : null, () =>
    authClient.organization.getFullOrganization({
      query: { organizationId, membersLimit: 100 },
      fetchOptions: { throw: true },
    }),
  );
};

export const useAddBusiness = () => {
  return useSWRMutation(
    BUSINESS_KEY,
    (url: string, { arg }: { arg: BusinessData }) =>
      authClient.organization.create({
        name: arg.name,
        categoryId: arg.categoryId,
        slug: arg.slug,
        metadata: { phone: arg.phone, address: arg.address },
        keepCurrentActiveOrganization: false,
        fetchOptions: { throw: true },
      }),
  );
};

export const useSetActiveBusiness = () => {
  return useSWRMutation(
    SESSION_KEY,
    (url: string, { arg }: { arg: { organizationId: string | null } }) =>
      authClient.organization.setActive({
        ...arg,
        fetchOptions: { throw: true },
      }),
  );
};
