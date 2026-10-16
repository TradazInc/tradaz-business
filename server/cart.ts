import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getCarts(
  organizationId: string | undefined,
  teamId: string | undefined,
) {
  return apiClient("@get/api/cart", {
    query: { pageSize: PAGE_SIZE },
    headers: scopeHeaders(organizationId, teamId),
    ...apiConfig,
  });
}

export async function getCart(
  id: string,
  organizationId: string | undefined,
  teamId: string | undefined,
) {
  return apiClient("@get/api/cart/:id", {
    params: { id },
    headers: scopeHeaders(organizationId, teamId),
    ...apiConfig,
  });
}
