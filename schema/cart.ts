import { z } from "zod";

// Get
export const GetCartItemOutputSchema = z
  .object({
    id: z.cuid2(),
    quantity: z.number(),
    addedAt: z.iso.datetime(),
    cartId: z.cuid2(),
    variationId: z.cuid2(),
    totalPrice: z.number(),
    variation: z.object({
      price: z.number(),
      product: z.object({ name: z.string() }),
    }),
  })
  .array();

// Create
export const CreateCartItemInputSchema = z.object({
  variationId: z.cuid2(),
  quantity: z.number().positive({ error: "Increase cart item quantity" }),
  cartId: z.cuid2(),
});

export const CreateCartItemOutputData = z.object({
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
export const UpdateCartItemInputSchema = z.object({
  couponCode: z.string().min(3),
  points: z.number(),
  depositAmount: z.number(),
  paymentConfigId: z.cuid2(),
  terminalConfigId: z.cuid2(),
  shippingMethodId: z.cuid2(),
});

export const UpdateCartItemOutputSchema = z.object({
  id: z.cuid2(),
  couponCode: z.string(),
  depositAmount: z.number(),
  points: z.number(),
  createdAt: z.iso.date(),
  paymentConfigId: z.cuid2(),
  terminalConfigId: z.cuid2(),
  shippingMethodId: z.cuid2(),
  memberId: z.cuid2(),
});

// Delete
export const DeleteCartItemParamSchema = z.object({ id: z.cuid2() });
export const DeleteCartItemOutputSchema = z.object({ id: z.cuid2() });
