import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";

/* Output Base Schemas */
// amount is a Prisma Decimal, serialized as a string over JSON
export const ExpenseOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
  recieptUrl: z.url(),
  createdAt: z.string(),
  updatedAt: z.string(),
  organizationId: z.cuid2(),
  teamId: z.cuid2().nullable(),
});

// Get All (index paginated)
export const GetAllExpenseQuerySchema = z.object({
  name: z.string().optional(),
  teamId: z.cuid2().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  page: z.number().positive().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllExpenseOutputSchema =
  createFetchResponseSchema(ExpenseOutputSchema);
export type GetAllExpenseOutputData = z.infer<typeof GetAllExpenseOutputSchema>;

// Create
export const CreateExpenseInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(2, { error: "name must be at least 2 letters long" }),

  description: z
    .string({ error: "description is required" })
    .min(2, { error: "description is required" }),

  amount: z
    .number({ error: "amount is required" })
    .positive({ error: "amount cannot be negative or zero" }),

  recieptUrl: z.url({ error: "enter a valid reciept url" }),

  teamId: z.cuid2().optional(),
});
export type CreateExpenseInputData = z.input<typeof CreateExpenseInputSchema>;
export const CreateExpenseOutputSchema = ExpenseOutputSchema;

// Update
export const UpdateExpenseParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdateExpenseInputSchema = CreateExpenseInputSchema.partial();
export type UpdateExpenseInputData = z.input<typeof UpdateExpenseInputSchema>;
export const UpdateExpenseOutputSchema = ExpenseOutputSchema;

// Delete
export const DeleteExpenseParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteExpenseParamData = z.infer<typeof DeleteExpenseParamSchema>;

export const emptyExpense: CreateExpenseInputData = {
  name: "",
  description: "",
  amount: 0,
  recieptUrl: "",
};
