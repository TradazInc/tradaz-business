import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getFinanceSummary(organizationId?: string) {
  return apiClient("@get/api/finance/summary", {
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
