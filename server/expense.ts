import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getExpenses(organizationId?: string) {
  return apiClient("@get/api/expense", {
    query: { pageSize: PAGE_SIZE, organizationId },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}
