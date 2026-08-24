import { authClient } from "@/lib/authClient";
import { BusinessData } from "@/schema/business";
import { BUSINESS_KEY } from "@/utilities/cacheKeys";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useBusinesses = () => {
  return useSWR([BUSINESS_KEY], () =>
    authClient.organization.list({ fetchOptions: { throw: true } }),
  );
};

export const useBusiness = (organizationId?: string) => {
  return useSWR([BUSINESS_KEY, organizationId], () =>
    authClient.organization.getFullOrganization({
      query: { organizationId, membersLimit: 100 },
      fetchOptions: { throw: true },
    }),
  );
};

export const useAddBusiness = () => {
  return useSWRMutation([BUSINESS_KEY], (key, { arg }: { arg: BusinessData }) =>
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
