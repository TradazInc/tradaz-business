import { ORDER_KEY, TRANSACTION_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateTransactionInputData,
  GetTransactionOutputData,
} from "@/schema/transaction";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useTransaction = (
  id?: string,
  config?: SWRConfiguration<GetTransactionOutputData, Error>,
) => {
  return useSWR(
    getScopedKey(TRANSACTION_KEY, id),
    ([key, id]) =>
      apiClient("@get/api/transactions/:id", { params: { id }, ...apiConfig }),
    config,
  );
};

export const useAddTransaction = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(ORDER_KEY, { organizationId })),
    (key, { arg }: { arg: CreateTransactionInputData }) =>
      apiClient("@post/api/transactions", { body: arg, ...apiConfig }),
    {
      onSuccess: (data) => mutate(getScopedKey(ORDER_KEY, data.id)),
    },
  );
};
