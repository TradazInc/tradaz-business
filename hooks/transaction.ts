import { ORDER_KEY, TRANSACTION_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import {
  CreateTransactionInputData,
  GetTransactionOutputData,
} from "@/schema/transaction";
import { cache } from "@/utilities/cacheKey";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useTransaction = (
  id: string | undefined,
  organizationId: string | undefined,
  teamId: string | undefined,
  config?: SWRConfiguration<GetTransactionOutputData, Error>,
) => {
  return useSWR(
    cache.scopedKey(TRANSACTION_KEY, id),
    ([key, id]) =>
      apiClient("@get/api/transactions/:id", {
        params: { id },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    config,
  );
};

export const useAddTransaction = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(ORDER_KEY, { organizationId })),
    (key, { arg }: { arg: CreateTransactionInputData }) =>
      apiClient("@post/api/transactions", {
        body: arg,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(ORDER_KEY, data.id)),
    },
  );
};
