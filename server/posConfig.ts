import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";

export async function getPosConfigs(
  organizationId: string | undefined,
  teamId: string | undefined,
) {
  return apiClient("@get/api/pos-configs", {
    query: { pageSize: PAGE_SIZE, organizationId, teamId },
    ...apiConfig,
  });
}
