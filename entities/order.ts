import { ApiClient } from "@/lib/apiClient";
import { Member } from "./member";
import { Transaction } from "./transaction";

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
  member: Member;
}

export enum OrderStatus {
  pending = "pending",
  paid = "paid",
  fulfilled = "fulfilled",
  cancelled = "cancelled",
}

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

export const orderService = new ApiClient<Order>("/api/orders");
