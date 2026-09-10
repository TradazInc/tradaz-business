import { apiClient } from "@/lib/fetchClient";

export async function getUIConfig() {
  return apiClient("@get/api/ui-configs", { throw: false as const });
}
