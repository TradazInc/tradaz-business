import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getCoupons(organizationId?: string) {
  return apiClient("@get/api/coupons", {
    query: { pageSize: PAGE_SIZE, organizationId },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}
