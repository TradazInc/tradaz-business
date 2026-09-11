import { PAGE_SIZE } from "@/data/constants";
import { apiClient } from "@/lib/apiClient";

export async function getSizeTypes() {
  return apiClient("@get/api/size-types", { query: { pageSize: PAGE_SIZE } });
}
