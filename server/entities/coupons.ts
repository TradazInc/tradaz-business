import { ApiClient } from "@/lib/apiClient";

export interface Coupon {
  discountType: DiscountType;
  id: string;
  name: string;
  code: string;
  discountValue: number;
  usageLimit: number;
  usageCount: number;
  minOrderValue: number;
  isActive: boolean;
  startsAt?: Date;
  endsAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  organizationId?: string;
  memberId?: string | null;
}

export enum DiscountType {
  percentage = "percentage",
  fixed = "fixed",
}

export const couponService = new ApiClient<Coupon>("/api/coupons");
