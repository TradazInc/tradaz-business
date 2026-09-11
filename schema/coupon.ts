import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";
import { DiscountType } from "./enums";

// Get
export const GetCouponParamSchema = z.object({
  id: z.cuid2(),
});

export const GetCouponOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  code: z.string(),
  discountValue: z.number(),
  discountType: z.enum(DiscountType),
  usageLimit: z.number(),
  usageCount: z.number(),
  minOrderValue: z.number(),
  isActive: z.boolean(),
  startsAt: z.string(),
  endsAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  organizationId: z.string(),
  memberId: z.string(),
});
export type GetCouponOutputData = z.infer<typeof GetCouponOutputSchema>;

// Get All
export const GetAllCouponQuerySchema = z.object({
  name: z.string().optional(),
  code: z.string().optional(),
  discountType: z.enum(DiscountType).optional(),
  isActive: z.boolean().optional(),
  organizationId: z.cuid2().optional(),
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllCouponOutputSchema = createFetchResponseSchema(
  z.object({
    id: z.cuid2(),
    name: z.string(),
    code: z.string(),
    discountType: z.enum(DiscountType),
    minOrderValue: z.number(),
    usageCount: z.number(),
    usageLimit: z.number(),
    discountValue: z.number(),
    isActive: z.boolean(),
  }),
);
export type GetAllCouponOutputData = z.infer<typeof GetAllCouponOutputSchema>;

// Create
// kept unrefined so the update schema below can be derived with .partial()
const CouponInputBaseSchema = z.object({
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
    .transform((code) => code.toUpperCase())
    .optional(),

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
    .min(1, { error: "start date is required" }),
  endsAt: z
    .string({ error: "end date is required" })
    .min(1, { error: "end date is required" }),

  memberId: z.cuid2().optional(),
});

export const CreateCouponInputSchema = CouponInputBaseSchema.superRefine(
  (coupon, ctx) => {
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
  },
);
export type CreateCouponInputData = z.input<typeof CreateCouponInputSchema>;
export const CreateCouponOutputSchema = GetCouponOutputSchema;

// Update
export const UpdateCouponParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdateCouponInputSchema =
  CouponInputBaseSchema.partial().superRefine((coupon, ctx) => {
    if (
      coupon.discountType === DiscountType.percentage &&
      coupon.discountValue !== undefined &&
      coupon.discountValue > 100
    )
      ctx.addIssue({
        code: "custom",
        path: ["discountValue"],
        message: "discount can't exceed 100%",
      });

    if (coupon.startsAt && coupon.endsAt && coupon.endsAt <= coupon.startsAt)
      ctx.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "end date must be after the start date",
      });
  });
export type UpdateCouponInputData = z.input<typeof UpdateCouponInputSchema>;
export const UpdateCouponOutputSchema = GetCouponOutputSchema;

// Delete
export const DeleteCouponParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteCouponParamData = z.infer<typeof DeleteCouponParamSchema>;

export const emptyCoupon: CreateCouponInputData = {
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
