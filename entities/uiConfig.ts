import { ApiClient } from "@/lib/apiClient";

export interface UIConfig {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  createdAt: string;
  organizationId: string;
}

export const uiConfigService = new ApiClient<UIConfig>("/api/ui-configs");
