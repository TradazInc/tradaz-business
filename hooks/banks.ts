import { BANK_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { GetAllBanksOutputData, GetAllBanksQueryData } from "@/schema/banks";
import { getCursorKey } from "@/utilities/computeKey";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export const useBanks = (
  query: GetAllBanksQueryData | null,
  config?: SWRInfiniteConfiguration<GetAllBanksOutputData, Error>,
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData: GetAllBanksOutputData | null) =>
      query ? getCursorKey(BANK_KEY, query)(pageIndex, previousPageData) : null,
    ([key, query]) => apiClient("@get/api/banks", { query, ...apiConfig }),
    config,
  );
};
