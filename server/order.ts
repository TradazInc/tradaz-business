import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";

export async function getOrders(organizationId: string | undefined) {
  return apiClient("@get/api/orders", {
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}

export async function getOrder(id: string) {
  return apiClient("@get/api/orders/:id", {
    params: { id },
  });
}
