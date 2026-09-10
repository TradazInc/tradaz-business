import { z } from "zod";

// amount is a Prisma Decimal, serialized as a string over JSON
export const GetRevenueOutputSchema = z.object({
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
export type GetRevenueOutputData = z.infer<typeof GetRevenueOutputSchema>;

// Get All
export const GetAllRevenueQuerySchema = z.object({
  teamId: z.cuid2().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllRevenueOutputSchema = z.object({
  data: z.array(GetRevenueOutputSchema),
  aggregate: z.coerce.number().nullable(),
  meta: z.object({ next: z.cuid2().optional() }),
});
export type GetAllRevenueOutputData = z.infer<typeof GetAllRevenueOutputSchema>;

// Create
export const CreateRevenueInputSchema = z.object({
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
export type CreateRevenueInputData = z.input<typeof CreateRevenueInputSchema>;
export const CreateRevenueOutputSchema = GetRevenueOutputSchema;

// Update
export const UpdateRevenueParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdateRevenueInputSchema = CreateRevenueInputSchema.partial();
export type UpdateRevenueInputData = z.input<typeof UpdateRevenueInputSchema>;
export const UpdateRevenueOutputSchema = GetRevenueOutputSchema;

// Delete
export const DeleteRevenueParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteRevenueParamData = z.infer<typeof DeleteRevenueParamSchema>;

export const emptyRevenue: CreateRevenueInputData = {
  name: "",
  description: "",
  amount: 0,
  recieptUrl: "",
};
