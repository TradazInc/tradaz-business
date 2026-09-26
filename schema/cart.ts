import { z } from "zod";
import { createFetchResponseSchema } from "../utilities/fetchResponse";

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
export type CartListItemData = GetAllCartsOutputData["data"][number];

// Get
export const GetCartOutputSchema = z.object({
  id: z.cuid2(),
  couponCode: z.string().nullable(),
  depositAmount: z.coerce.number().nullable(),
  points: z.coerce.number().nullable(),
  createdAt: z.iso.duration(),
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
        price: z.coerce.number(),
        product: z.object({ name: z.string() }),
      }),
    })
    .array(),
});

export const GetCartParamSchema = z.object({ id: z.cuid2() });

// Create
export const CreateCartItemInputSchema = z.object({
  variationId: z.cuid2(),
  quantity: z.number().positive({ error: "Increase cart item quantity" }),
  cartId: z.cuid2().optional(),
});
export type CreateCartItemInputData = z.infer<typeof CreateCartItemInputSchema>;

export const CreateCartItemOutputSchema = z.object({
  id: z.cuid2(),
  quantity: z.number(),
  addedAt: z.iso.datetime(),
  cartId: z.string(),
  variationId: z.string(),
  totalPrice: z.number(),
});

// Increment
export const IncrementCartItemInputSchema = z.object({
  id: z.cuid2(),
});

export const IncrementCartItemOuputSchema = z.object({
  id: z.cuid2(),
  quantity: z.number(),
  addedAt: z.iso.datetime(),
  cartId: z.cuid2(),
  variationId: z.cuid2(),
  totalPrice: z.number(),
});

// Decrement
export const DecrementCartItemInputSchema = IncrementCartItemInputSchema;
export const DecrementCartItemOuputSchema = IncrementCartItemOuputSchema;

// Update
export const UpdateCartParamSchema = z.object({ id: z.cuid2() });

export const UpdateCartInputSchema = z.object({
  couponCode: z.string().min(3),
  points: z.number(),
  depositAmount: z.number(),
  paymentConfigId: z.cuid2(),
  terminalConfigId: z.cuid2(),
  shippingMethodId: z.cuid2(),
});
export type UpdateCartInputData = z.infer<typeof UpdateCartInputSchema>;

export const UpdateCartOutputSchema = z.object({
  id: z.cuid2(),
  couponCode: z.string().nullable(),
  depositAmount: z.number().nullable(),
  points: z.number().nullable(),
  createdAt: z.iso.date(),
  paymentConfigId: z.cuid2().nullable(),
  terminalConfigId: z.cuid2().nullable(),
  shippingMethodId: z.cuid2().nullable(),
  memberId: z.cuid2(),
});

// Delete
export const DeleteCartItemParamSchema = z.object({ id: z.cuid2() });
export const DeleteCartItemOutputSchema = z.object({
  id: z.cuid2(),
  cartId: z.cuid2(),
});

export const DeleteCartParamSchema = z.object({ id: z.cuid2() });
export const DeleteCartOutputSchema = z.object({ id: z.cuid2() });
