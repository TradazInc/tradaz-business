import { z } from "zod";
import {
  createFetchResponseSchema,
  OptionalIdSchema,
} from "../utilities/fetchResponse";

// Base Schemas
export const BaseCartParamSchema = z.object({ id: z.cuid2() });

export const BaseCartOutputSchema = z.object({
  id: z.cuid2(),
  couponCode: z.string().nullable(),
  depositAmount: z.coerce.number().nullable(),
  points: z.number().nullable(),
  createdAt: z.iso.datetime(),
  paymentConfigId: z.cuid2().nullable(),
  terminalConfigId: z.cuid2().nullable(),
  shippingMethodId: z.cuid2().nullable(),
  memberId: z.cuid2(),
});

export const BaseCreateCartInputSchema = z
  .object({
    couponCode: z.string().trim(),
    depositAmount: z.number().nonnegative(),
    points: z.number().int().nonnegative(),
    paymentConfigId: OptionalIdSchema,
    terminalConfigId: OptionalIdSchema,
    shippingMethodId: OptionalIdSchema,
  })
  .partial();
export type BaseCreateCartInputData = z.infer<typeof BaseCreateCartInputSchema>;

// Get All
export const GetAllCartsQuerySchema = z.object({
  memberId: z.cuid2().optional(),
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});
export type GetAllCartsQueryData = z.infer<typeof GetAllCartsQuerySchema>;

export const GetAllCartsOutputSchema = createFetchResponseSchema(
  z.object({
    id: z.cuid2(),
    couponCode: z.string().nullable(),
    depositAmount: z.coerce.number().nullable(),
    points: z.coerce.number().nullable(),
    createdAt: z.iso.datetime(),
    paymentConfigId: z.cuid2().nullable(),
    terminalConfigId: z.cuid2().nullable(),
    shippingMethodId: z.cuid2().nullable(),
    memberId: z.cuid2(),
  }),
);
export type GetAllCartsOutputData = z.infer<typeof GetAllCartsOutputSchema>;
export type GetAllCartsOutputItemData = GetAllCartsOutputData["data"][number];

// Get
export const GetCartOutputSchema = z.object({
  id: z.cuid2(),
  couponCode: z.string().nullable(),
  depositAmount: z.coerce.number().nullable(),
  points: z.coerce.number().nullable(),
  createdAt: z.iso.datetime(),
  paymentConfigId: z.cuid2().nullable(),
  terminalConfigId: z.cuid2().nullable(),
  shippingMethodId: z.cuid2().nullable(),
  memberId: z.cuid2(),
  cartItems: z
    .object({
      id: z.cuid2(),
      quantity: z.coerce.number(),
      addedAt: z.iso.datetime(),
      cartId: z.cuid2(),
      variationId: z.cuid2(),
      totalPrice: z.coerce.number(),
      variation: z.object({
        id: z.cuid2(),
        sku: z.string(),
        color: z.string(),
        price: z.coerce.number(),
        size: z.object({ id: z.cuid2(), value: z.string() }).nullable(),
        product: z.object({ id: z.cuid2(), name: z.string() }),
        teamVariations: z
          .object({
            id: z.cuid2(),
            quantity: z.coerce.number(),
            teamId: z.cuid2(),
          })
          .array(),
      }),
    })
    .array(),
});
export type GetCartOutputData = z.infer<typeof GetCartOutputSchema>;

export const GetCartParamSchema = BaseCartParamSchema;

// Create
export const CreateCartInputSchema = BaseCreateCartInputSchema.superRefine(
  (data, ctx) => {
    if (data.paymentConfigId || data.terminalConfigId) return;
    for (const path of ["paymentConfigId", "terminalConfigId"]) {
      ctx.addIssue({
        code: "custom",
        message: "Select a terminal or payment gateway",
        path: [path],
      });
    }
  },
);
export type CreateCartInputData = z.infer<typeof CreateCartInputSchema>;

export const CreateCartOutputSchema = BaseCartOutputSchema;
export type CreateCartOutputData = z.infer<typeof CreateCartOutputSchema>;

// Update
export const UpdateCartParamSchema = BaseCartParamSchema;

export const UpdateCartInputSchema = CreateCartInputSchema;
export type UpdateCartInputData = z.infer<typeof UpdateCartInputSchema>;

export const UpdateCartOutputSchema = BaseCartOutputSchema;

// Delete
export const DeleteCartParamSchema = z.object({ id: z.cuid2() });
export const DeleteCartOutputSchema = z.object({ id: z.cuid2() });

export const emptyCart: CreateCartInputData = {
  couponCode: "",
  depositAmount: 0,
  paymentConfigId: "",
  points: 0,
  shippingMethodId: "",
  terminalConfigId: "",
};

export const formCart = (cart: GetCartOutputData): UpdateCartInputData => ({
  paymentConfigId: cart.paymentConfigId ?? "",
  terminalConfigId: cart.terminalConfigId ?? undefined,
  couponCode: cart.couponCode ?? "",
  points: cart.points ?? 0,
  depositAmount: cart.depositAmount ?? 0,
});

/* Cart Item */
// Create
export const CreateCartItemInputSchema = z.object({
  variationId: z.cuid2(),
  quantity: z.number().positive({ error: "Increase cart item quantity" }),
  cartId: z.cuid2().optional(),
});
export type CreateCartItemInputData = z.infer<typeof CreateCartItemInputSchema>;

export const CreateCartItemOutputSchema = z.object({
  id: z.cuid2(),
  quantity: z.coerce.number(),
  addedAt: z.iso.datetime(),
  cartId: z.string(),
  variationId: z.string(),
  totalPrice: z.coerce.number(),
});

// Increment
export const IncrementCartItemInputSchema = z.object({
  id: z.cuid2(),
});

export const IncrementCartItemOuputSchema = z.object({
  id: z.cuid2(),
  quantity: z.coerce.number(),
  addedAt: z.iso.datetime(),
  cartId: z.cuid2(),
  variationId: z.cuid2(),
  totalPrice: z.coerce.number(),
});

// Decrement
export const DecrementCartItemInputSchema = IncrementCartItemInputSchema;
export const DecrementCartItemOuputSchema = IncrementCartItemOuputSchema;

// Delete
export const DeleteCartItemParamSchema = BaseCartParamSchema;
export const DeleteCartItemOutputSchema = z.object({
  id: z.cuid2(),
  cartId: z.cuid2(),
});
