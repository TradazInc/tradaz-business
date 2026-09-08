import { ApiClient } from "@/lib/apiClient";

export interface Revenue {
  id: string;
  name: string;
  description: string;
  amount: number;
  recieptUrl: string;
  createdAt: string;
  updatedAt: string;
  organizationId: string;
  teamId: string;
}

export const revenueService = new ApiClient<Revenue>("/api/revenue");
