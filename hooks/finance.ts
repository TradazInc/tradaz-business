import { FINANCE_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { GetFinanceSummaryQuerySchema } from "@/schema/finance";
import { getScopedKey } from "@/utilities/computeKey";
import useSWR from "swr";
import { useSearchQuery } from "./useSearchQuery";

export const useFinanceSummary = (organizationId: string | undefined) => {
  const query = useSearchQuery(GetFinanceSummaryQuerySchema);

  return useSWR(getScopedKey(FINANCE_KEY, organizationId), ([key, id]) =>
    apiClient("@get/api/finance/summary", {
      query: { ...query, organizationId },
      ...apiConfig,
    }),
  );
};
