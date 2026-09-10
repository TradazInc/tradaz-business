import { SUBACCOUNT_KEY } from "@/data/cacheKeys";
import { apiClient } from "@/lib/fetchClient";
import {
  CreateSubaccountInputData,
  GetAllSubaccountOutputData,
  UpdateSubaccountInputData,
} from "@/schema/subaccount";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useSubaccounts = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllSubaccountOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(SUBACCOUNT_KEY, query),
    ([key, query]) => apiClient("@get/api/subaccounts", { query }),
    config,
  );
};

export const useAddSubaccount = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SUBACCOUNT_KEY, organizationId),
    (key, { arg }: { arg: CreateSubaccountInputData }) =>
      apiClient("@post/api/subaccounts", { body: arg }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SUBACCOUNT_KEY, { organizationId })),
        ),
    },
  );
};

export const useUpdateSubaccount = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SUBACCOUNT_KEY, organizationId),
    (key, { arg }: { arg: UpdateSubaccountInputData }) =>
      apiClient("@put/api/subaccounts", { body: arg }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SUBACCOUNT_KEY, { organizationId })),
        ),
    },
  );
};
