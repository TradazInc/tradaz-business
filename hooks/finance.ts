import { FINANCE_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { GetFinanceSummaryQuerySchema } from "@/schema/finance";
import { getScopedKey } from "@/utilities/computeKey";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

export const useFinanceSummary = (organizationId: string | undefined) => {
  const searchParams = useSearchParams();
  const query = {
    organizationId,
    ...GetFinanceSummaryQuerySchema.parse(searchParams),
  };

  return useSWR(getScopedKey(FINANCE_KEY, organizationId), ([key, id]) =>
    apiClient("@get/api/finance/summary", { query, ...apiConfig }),
  );
};
