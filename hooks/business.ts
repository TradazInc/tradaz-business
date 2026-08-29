import { authClient } from "@/lib/authClient";
import { BusinessData } from "@/schema/business";
import { BUSINESS_KEY } from "@/data/cacheKeys";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { getKey, getScopedKey } from "@/utilities/computeKey";

export const useBusinesses = () => {
  return useSWR(getKey(BUSINESS_KEY), () =>
    authClient.organization.list({ fetchOptions: { throw: true } }),
  );
};

export const useBusiness = (organizationId: string | undefined) => {
  return useSWR(getScopedKey(BUSINESS_KEY, organizationId), () =>
    authClient.organization.getFullOrganization({
      query: { organizationId, membersLimit: 100 },
      fetchOptions: { throw: true },
    }),
  );
};

export const useAddBusiness = () => {
  return useSWRMutation(
    getKey(BUSINESS_KEY),
    (key, { arg }: { arg: BusinessData }) =>
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
