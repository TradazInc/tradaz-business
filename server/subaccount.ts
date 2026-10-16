import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getSubaccounts(organizationId?: string) {
  return apiClient("@get/api/subaccounts", {
    query: { pageSize: PAGE_SIZE, organizationId },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}
