import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";

export async function getPointsConfigs() {
  return apiClient("@get/api/points-config", {
    query: { pageSize: PAGE_SIZE },
  });
}
