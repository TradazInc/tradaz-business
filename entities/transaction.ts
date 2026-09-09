import { ApiClient } from "@/lib/apiClient";
import { Gateway } from "./subaccount";

// Update API return shape
export interface Transaction {
  id: string;
  externalTxId: string;
  amount: number;
  gateway: Gateway;
  transactionStatus: TransactionStatus;
  createdAt: string;
  updatedAt: string;
  orderId: string;
  paymentConfigId: string;
  terminalConfigId: string;
}

export enum TransactionStatus {
  paid = "paid",
  pending = "pending",
}

export const transactionService = new ApiClient<Transaction>(
  "/api/transactions",
);
