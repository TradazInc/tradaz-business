import { FINANCE_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import { GetFinanceSummaryQuerySchema } from "@/schema/finance";
import { cache } from "@/utilities/cacheKey";
import useSWR from "swr";
import { useSearchQuery } from "./searchQuery";

export const useFinanceSummary = (organizationId: string | undefined) => {
  const query = useSearchQuery(GetFinanceSummaryQuerySchema);

  return useSWR(cache.scopedKey(FINANCE_KEY, organizationId), ([key, id]) =>
    apiClient("@get/api/finance/summary", {
      query: { ...query, organizationId },
      headers: scopeHeaders(organizationId),
      ...apiConfig,
    }),
  );
};
