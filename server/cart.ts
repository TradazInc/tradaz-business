import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";

export async function getCarts(organizationId: string | undefined) {
  return apiClient("@get/api/cart", {
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}

export async function getCart(id: string) {
  return apiClient("@get/api/cart/:id", {
    params: { id },
  });
}
