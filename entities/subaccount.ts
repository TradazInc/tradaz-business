import { ApiClient } from "@/lib/apiClient";

export interface Subaccount {
  id: string;
  gateway: Gateway;
  subAccountId: string;
  createdAt: string;
  organizationId: string;
}

export interface SubaccountMsg {
  message?: string;
}

export enum Gateway {
  opay = "opay",
  moniepoint = "moniepoint",
  paystack = "paystack",
}

export const subaccountService = new ApiClient<Subaccount & SubaccountMsg>(
  "/api/subaccounts",
);
