import { TRANSACTION_KEY } from "@/data/cacheKeys";
import { apiClient } from "@/lib/apiClient";
import { CreateTransactionInputData } from "@/schema/transaction";
import { getScopedKey } from "@/utilities/computeKey";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export const useTransaction = (
  id: string,
  organizationId: string | undefined,
) => {
  return useSWR(getScopedKey(TRANSACTION_KEY, organizationId), ([key, query]) =>
    apiClient("@get/api/transactions/:id", { params: { id } }),
  );
};

export const useAddTransaction = (organizationId: string | undefined) => {
  return useSWRMutation(
    getScopedKey(TRANSACTION_KEY, organizationId),
    (_, { arg }: { arg: CreateTransactionInputData }) =>
      apiClient("@post/api/transactions", { body: arg }),
  );
};
