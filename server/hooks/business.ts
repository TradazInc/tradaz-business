import { ORGANIZATIONS_KEY } from "@/data/swrCacheKeys";
import { authClient } from "@/lib/authClient";
import { BusinessData } from "@/schema/business";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

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
