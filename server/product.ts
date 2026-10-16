import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getProduct(
  id: string,
  organizationId: string | undefined,
) {
  return apiClient("@get/api/products/:id", {
    params: { id },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}

export async function getProducts(organizationId?: string) {
  return apiClient("@get/api/products", {
    query: { pageSize: PAGE_SIZE, organizationId },
    ...apiConfig,
  });
}
