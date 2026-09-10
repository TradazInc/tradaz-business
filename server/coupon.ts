import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/fetchClient";

export async function getCoupons(organizationId?: string) {
  return apiClient("@get/api/coupons", {
    query: { pageSize: PAGE_SIZE, organizationId },
    throw: false as const,
  });
}
