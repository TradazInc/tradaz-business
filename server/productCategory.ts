import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/fetchClient";

export async function getProductCategories(organizationId?: string) {
  return apiClient("@get/api/product-categories", {
    query: { pageSize: PAGE_SIZE, organizationId },
    throw: false as const,
  });
}
