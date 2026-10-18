import { SUBACCOUNT_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import {
  CreateSubaccountInputData,
  GetAllSubaccountOutputData,
  GetAllSubaccountQuerySchema,
  UpdateSubaccountInputData,
} from "@/schema/subaccount";
import { cache } from "@/utilities/cacheKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const useSubaccounts = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllSubaccountOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllSubaccountQuerySchema);

  return useSWRInfinite(
    cache.cursorKey(SUBACCOUNT_KEY, { ...query, organizationId }),
    ([key, query]) =>
      apiClient("@get/api/subaccounts", {
        query,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    config,
  );
};

export const useAddSubaccount = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(cache.cursorKey(SUBACCOUNT_KEY, { organizationId })),
    (key, { arg }: { arg: CreateSubaccountInputData }) =>
      apiClient("@post/api/subaccounts", {
        body: arg,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
  );
};

export const useUpdateSubaccount = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(SUBACCOUNT_KEY, { organizationId })),
    (key, { arg }: { arg: UpdateSubaccountInputData }) =>
      apiClient("@put/api/subaccounts", {
        body: arg,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    {
      onSuccess: () => mutate(cache.scopedKey(SUBACCOUNT_KEY, organizationId)),
    },
  );
};
