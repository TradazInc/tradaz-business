import { EXPENSES_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
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
import { useSearchQuery } from "./useSearchQuery";

export const useExpenses = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllExpenseOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllExpenseQuerySchema);

  return useSWRInfinite(
    getCursorKey(EXPENSES_KEY, { ...query, organizationId }),
    ([key, query]) => apiClient("@get/api/expense", { query, ...apiConfig }),
    config,
  );
};

export const useAddExpense = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(EXPENSES_KEY, organizationId),
    (key, { arg }: { arg: CreateExpenseInputData }) =>
      apiClient("@post/api/expense", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(EXPENSES_KEY, { organizationId })),
        ),
    },
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
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(EXPENSES_KEY, data.id)),
    },
  );
};

export const useRemoveExpense = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(EXPENSES_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/expense/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(EXPENSES_KEY, { organizationId })),
        ),
    },
  );
};
