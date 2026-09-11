import { apiClient } from "@/lib/apiClient";

export async function getUIConfig() {
  return apiClient("@get/api/ui-configs");
}
