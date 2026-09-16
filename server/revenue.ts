import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";

export async function getRevenues(organizationId?: string) {
  return apiClient("@get/api/revenue", {
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
