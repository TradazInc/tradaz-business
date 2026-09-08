import { ApiClient } from "@/lib/apiClient";
import { OrgRole } from "./member";
import { Gateway } from "./subaccount";

export interface Order {
  id: string;
  couponCode: string;
  points: number;
  reference: string;
  paidPrice: number;
  totalPrice: number;
  orderStatus: OrderStatus;
  createdAt: string;
  organizationId: string;
  teamId: string;
  memberId: string;
  cartId: string;
  discount: number;
  orderItems: OrderItem[];
  transactions: Transaction[];
  member: {
    id: string;
    role: OrgRole;
    approved: true;
    createdAt: string;
    organizationId: string;
    userId: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export enum OrderStatus {}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  paidPrice: number;
  orderId: string;
  variationId: string;
  vendorId: string;
  totalPrice: number;
  discount: number;
}

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

export const orderService = new ApiClient<Order>("/api/orders");
