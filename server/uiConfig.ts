import { apiClient } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getUIConfig(organizationId: string | undefined) {
  return apiClient("@get/api/ui-configs", {
    headers: scopeHeaders(organizationId),
  });
}
