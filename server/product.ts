import { PAGE_SIZE } from "@/data/constants";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { GetApprovedProductQueryData } from "@/schema/product";
import { scopeHeaders } from "@/utilities/scopeHeaders";

export async function getApprovedProduct(
  id: string,
  query: GetApprovedProductQueryData = {},
) {
  return apiClient("@get/api/products/:id/approved", {
    params: { id },
    query,
    ...apiConfig,
  });
}

export async function getProduct(
  id: string,
  organizationId: string | undefined,
) {
  return apiClient("@get/api/products/:id", {
    params: { id },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}

export async function getProducts(organizationId: string | undefined) {
  return apiClient("@get/api/products", {
    query: { pageSize: PAGE_SIZE },
    headers: scopeHeaders(organizationId),
    ...apiConfig,
  });
}
