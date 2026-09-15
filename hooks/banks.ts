import { BANK_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { GetAllBanksOutputData, GetAllBanksQuerySchema } from "@/schema/banks";
import { getCursorKey } from "@/utilities/computeKey";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";
import { useSearchQuery } from "./useSearchQuery";

export const useBanks = (
  config?: SWRInfiniteConfiguration<GetAllBanksOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllBanksQuerySchema);

  return useSWRInfinite(
    getCursorKey(BANK_KEY, query),
    ([key, query]) => apiClient("@get/api/banks", { query, ...apiConfig }),
    config,
  );
};
