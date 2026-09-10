import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";
import { Gateway } from "./gateway";

export { Gateway };

// Get
export const GetSubaccountOutputSchema = z.object({
  id: z.cuid2(),
  gateway: z.enum(Gateway),
  subAccountId: z.string(),
  createdAt: z.string(),
  organizationId: z.cuid2(),
});
export type GetSubaccountOutputData = z.infer<
  typeof GetSubaccountOutputSchema
>;

// Get All
export const GetAllSubaccountQuerySchema = z.object({
  gateway: z.enum(Gateway).optional(),
  organizationId: z.cuid2().optional(),
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllSubaccountOutputSchema = createFetchResponseSchema(
  GetSubaccountOutputSchema,
);
export type GetAllSubaccountOutputData = z.infer<
  typeof GetAllSubaccountOutputSchema
>;

// Create
export const CreateSubaccountInputSchema = z.object({
  gateway: z.enum(Gateway, { error: "select a gateway" }),

  bankCode: z
    .string({ error: "bank code is required" })
    .length(3, { error: "bank code must be 3 digits" }),

  accountNumber: z
    .string({ error: "account number is required" })
    .length(10, { error: "account number must be 10 digits" })
    .regex(/^\d+$/, { error: "account number must contain only numbers" }),
});
export type CreateSubaccountInputData = z.input<
  typeof CreateSubaccountInputSchema
>;
export const CreateSubaccountOutputSchema = GetSubaccountOutputSchema;

// Update
export const UpdateSubaccountInputSchema = CreateSubaccountInputSchema.extend({
  email: z.email({ error: "enter a valid email" }).optional(),
});
export type UpdateSubaccountInputData = z.input<
  typeof UpdateSubaccountInputSchema
>;
export const UpdateSubaccountOutputSchema = z.object({
  message: z.string(),
});

export const emptySubaccount: CreateSubaccountInputData = {
  gateway: Gateway.paystack,
  bankCode: "",
  accountNumber: "",
};
