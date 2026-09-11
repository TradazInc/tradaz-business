import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";

export async function getShippingConfigs() {
  return apiClient("@get/api/shipping-configs", {
    query: { pageSize: PAGE_SIZE },
  });
}
