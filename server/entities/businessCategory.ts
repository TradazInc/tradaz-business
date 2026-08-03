import { ApiClient } from "@/lib/apiClient";

export interface BusinessCategory {
  id: string;
  name: string;
}

export const businessCategoryService = new ApiClient<BusinessCategory>(
  "/api/business-categories",
);
