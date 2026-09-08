import { ApiClient } from "@/lib/apiClient";

export interface Finance {
  totalRevenue: number;
  totalExpenses: number;
  profit: number;
}

export const financeService = new ApiClient<Finance>("/api/finance");
