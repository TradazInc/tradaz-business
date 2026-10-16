import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getPointsConfigs(organizationId: string | undefined) {
  return apiClient("@get/api/points-config", {
    query: { pageSize: PAGE_SIZE },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}
