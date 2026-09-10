import {
  CreateBusinessCategoryInputSchema,
  CreateBusinessCategoryOutputSchema,
  DeleteBusinessCategoryParamSchema,
  GetAllBusinessCategoryOutputSchema,
} from "@/schema/businessCategory";
import {
  CreateCouponInputSchema,
  CreateCouponOutputSchema,
  DeleteCouponParamSchema,
  GetAllCouponOutputSchema,
  GetAllCouponQuerySchema,
  GetCouponOutputSchema,
  GetCouponParamSchema,
  UpdateCouponInputSchema,
  UpdateCouponOutputSchema,
} from "@/schema/coupon";
import { setServerCookie } from "@/utilities/setServerCookie";
import { createFetch, createSchema } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";

export const schema = createSchema({
  // Business categories
  "@get/api/business-categories": {
    output: GetAllBusinessCategoryOutputSchema,
  },
  "@post/api/business-categories": {
    input: CreateBusinessCategoryInputSchema,
    output: CreateBusinessCategoryOutputSchema,
  },
  "@delete/api/business-categories": {
    params: DeleteBusinessCategoryParamSchema,
  },

  // Coupons
  "@get/api/coupons": {
    query: GetAllCouponQuerySchema.optional(),
    output: GetAllCouponOutputSchema,
  },
  "@get/api/coupons/:id": {
    params: GetCouponParamSchema,
    output: GetCouponOutputSchema,
  },
  "@post/api/coupons": {
    input: CreateCouponInputSchema,
    output: CreateCouponOutputSchema,
  },
  "@put/api/coupons": {
    input: UpdateCouponInputSchema,
    output: UpdateCouponOutputSchema,
  },
  "@delete/api/coupons": {
    params: DeleteCouponParamSchema,
  },
});

export const apiClient = createFetch({
  schema: schema,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  onRequest: async (context) => setServerCookie(context),
  plugins: [logger()],
});
