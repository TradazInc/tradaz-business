import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/fetchClient";

export async function getShippingConfigs() {
  return apiClient("@get/api/shipping-configs", {
    query: { pageSize: PAGE_SIZE },
    throw: false as const,
  });
}
