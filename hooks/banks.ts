import { BANK_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { GetAllBanksOutputData, GetAllBanksQuerySchema } from "@/schema/banks";
import { getCursorKey } from "@/utilities/computeKey";
import { useSearchParams } from "next/navigation";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export const useBanks = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllBanksOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = {
    organizationId,
    ...GetAllBanksQuerySchema.parse(searchParams),
  };

  return useSWRInfinite(
    getCursorKey(BANK_KEY, query),
    ([key, query]) => apiClient("@get/api/banks", { query, ...apiConfig }),
    config,
  );
};
