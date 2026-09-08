import { ApiClient } from "@/lib/apiClient";
import { Gateway } from "./subaccount";

export interface Transaction {
  id: string;
  externalTxId: string;
  amount: number;
  gateway: Gateway;
  transactionStatus: "pending";
  createdAt: string;
  updatedAt: string;
  orderId: string;
  paymentConfigId: string;
  terminalConfigId: string;
}

export const transactionService = new ApiClient<Transaction>(
  "/api/transactions",
);
