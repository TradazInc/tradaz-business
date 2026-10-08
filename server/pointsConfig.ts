import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";

export async function getPointsConfigs() {
  return apiClient("@get/api/points-config", {
    query: { pageSize: PAGE_SIZE },
    ...apiConfig,
  });
}
