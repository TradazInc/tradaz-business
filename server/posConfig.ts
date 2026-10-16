import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getPosConfigs(
  organizationId: string | undefined,
  teamId: string | undefined,
) {
  return apiClient("@get/api/pos-configs", {
    query: { pageSize: PAGE_SIZE },
    headers: scopeHeaders(organizationId, teamId),
    ...apiConfig,
  });
}
