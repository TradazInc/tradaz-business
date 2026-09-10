import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";

export async function getPosConfigs() {
  return apiClient("@get/api/pos-configs", {
    query: { pageSize: PAGE_SIZE },
  });
}
