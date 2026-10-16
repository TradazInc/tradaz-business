import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getSizeTypes(organizationId: string | undefined) {
  return apiClient("@get/api/size-types", {
    query: { pageSize: PAGE_SIZE },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}
