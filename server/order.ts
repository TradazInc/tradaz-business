import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getOrders(organizationId: string | undefined) {
  return apiClient("@get/api/orders", {
    query: { pageSize: PAGE_SIZE, organizationId },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}

export async function getOrder(id: string, organizationId: string | undefined) {
  return apiClient("@get/api/orders/:id", {
    params: { id },
    headers: scopeHeaders(organizationId),
  });
}
