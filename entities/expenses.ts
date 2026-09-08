import { ApiClient } from "@/lib/apiClient";

export interface Expense {
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

export const expenseService = new ApiClient<Expense>("/api/expenses");
