import { z } from "zod";
import { Gateway } from "./gateway";
import { OrderStatus, TransactionStatus } from "./order";

export { TransactionStatus };

// Get (normalised details from the payment gateway)
export const GetTransactionParamSchema = z.object({
  id: z.cuid2(),
});

export const GetTransactionOutputSchema = z.object({
  externalTxId: z.string(),
  transactionId: z.string(),
  amount: z.string(),
  status: z.string(),
  createdAt: z.string(),
});
export type GetTransactionOutputData = z.infer<
  typeof GetTransactionOutputSchema
>;

// Create
export const CreateTransactionInputSchema = z.object({
  amount: z
    .number({ error: "amount is required" })
    .positive({ error: "amount cannot be negative or zero" }),

  transactionStatus: z.enum(TransactionStatus, {
    error: "select a transaction status",
  }),

  gateway: z.enum(Gateway, { error: "select a gateway" }),

  orderId: z.cuid2({ error: "select an order" }),

  externalTxId: z.string().optional(),

  terminalConfigId: z.cuid2().optional(),
});
export type CreateTransactionInputData = z.input<
  typeof CreateTransactionInputSchema
>;

// Create (Response) - the updated order
export const CreateTransactionOutputSchema = z.object({
  id: z.cuid2(),
  couponCode: z.string().nullable(),
  points: z.number().nullable(),
  reference: z.string(),
  paidPrice: z.coerce.number(),
  totalPrice: z.coerce.number(),
  discount: z.coerce.number(),
  orderStatus: z.enum(OrderStatus),
  createdAt: z.string(),
  organizationId: z.cuid2(),
  teamId: z.cuid2().nullable(),
  memberId: z.cuid2(),
  cartId: z.cuid2().nullable(),
});
export type CreateTransactionOutputData = z.infer<
  typeof CreateTransactionOutputSchema
>;
