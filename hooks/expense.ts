import { EXPENSES_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import {
  CreateExpenseInputData,
  GetAllExpenseOutputData,
  GetAllExpenseQuerySchema,
  UpdateExpenseInputData,
} from "@/schema/expense";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const useExpenses = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllExpenseOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllExpenseQuerySchema);

  return useSWRInfinite(
    getCursorKey(EXPENSES_KEY, { ...query, organizationId }),
    ([key, query]) =>
      apiClient("@get/api/expense", {
        query,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    config,
  );
};

export const useAddExpense = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(EXPENSES_KEY, { organizationId })),
    (key, { arg }: { arg: CreateExpenseInputData }) =>
      apiClient("@post/api/expense", {
        body: arg,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
  );
};

export const useUpdateExpense = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(EXPENSES_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateExpenseInputData } }) =>
      apiClient("@put/api/expense/:id", {
        params: { id: arg.id },
        body: arg.data,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(EXPENSES_KEY, data.id)),
    },
  );
};

export const useRemoveExpense = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(EXPENSES_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/expense/:id", {
        params: { id: arg },
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
  );
};
