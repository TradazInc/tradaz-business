import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";

export async function getProductCategories(organizationId?: string) {
  return apiClient("@get/api/product-categories", {
    query: { pageSize: PAGE_SIZE, organizationId },
    ...apiConfig,
  });
}
