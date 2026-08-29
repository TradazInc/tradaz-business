import { Coupon, DiscountType } from "@/entities/coupons";
import { z } from "zod";

export const couponSchema = z
  .object({
    discountType: z.enum(DiscountType, { error: "select a discount type" }),

    name: z
      .string({ error: "name is required" })
      .min(3, { error: "name must be at least 3 letters long" }),

    code: z
      .string({ error: "code is required" })
      .min(3, { error: "code must be at least 3 characters long" })
      .regex(/^[A-Za-z0-9-]+$/, {
        error: "code can only contain letters, numbers and hyphens",
      })
      .transform((code) => code.toUpperCase()),

    discountValue: z
      .number({ error: "discount value is required" })
      .positive({ error: "discount value cannot be negative or zero" }),

    usageLimit: z
      .int({ error: "usage limit is required" })
      .nonnegative({ error: "usage limit cannot be negative" }),

    minOrderValue: z
      .number({ error: "minimum order value is required" })
      .nonnegative({ error: "minimum order value cannot be negative" }),

    isActive: z.boolean({ error: "select a status" }).default(true),

    startsAt: z
      .string({ error: "start date is required" })
      .min(1, { error: "start date is required" })
      .transform((value) => new Date(value)),

    endsAt: z
      .string({ error: "end date is required" })
      .min(1, { error: "end date is required" })
      .transform((value) => new Date(value)),

    memberId: z.cuid2().optional(),
  })
  .superRefine((coupon, ctx) => {
    if (
      coupon.discountType === DiscountType.percentage &&
      coupon.discountValue > 100
    )
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message: "discount can't exceed 100%",
      });

    if (coupon.endsAt <= coupon.startsAt)
      ctx.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "end date must be after the start date",
      });
  });
export type CouponData = z.infer<typeof couponSchema>;
export type CouponFormValues = z.input<typeof couponSchema>;

export const emptyCoupon: CouponFormValues = {
  discountType: DiscountType.percentage,
  name: "",
  code: "",
  discountValue: 0,
  usageLimit: 0,
  minOrderValue: 0,
  isActive: true,
  startsAt: "",
  endsAt: "",
};

export function formCoupon(coupon: Coupon): CouponFormValues {
  return {
    ...coupon,
    startsAt: coupon.startsAt?.toISOString() ?? "",
    endsAt: coupon.endsAt?.toISOString() ?? "",
  };
}
