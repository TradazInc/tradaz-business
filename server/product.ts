import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/fetchClient";

export async function getProduct(id: string) {
  return apiClient("@get/api/products/:id", {
    params: { id },
    throw: false as const,
  });
}

export async function getProducts(organizationId?: string) {
  return apiClient("@get/api/products", {
    query: { pageSize: PAGE_SIZE, organizationId },
    throw: false as const,
  });
}
