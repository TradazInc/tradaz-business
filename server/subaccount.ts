import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/fetchClient";

export async function getSubaccounts(organizationId?: string) {
  return apiClient("@get/api/subaccounts", {
    query: { pageSize: PAGE_SIZE, organizationId },
    throw: false as const,
  });
}
