import { authClient } from "@/lib/authClient";
import { z } from "zod";

// Get
export type GetStoreOutputData = typeof authClient.$Infer.Team;

export const GetStoreOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
  organizationId: z.string(),
  address: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
}) satisfies z.ZodType<GetStoreOutputData, unknown>;

// Get All
export const GetAllStoreOutputSchema = GetStoreOutputSchema.array();
export type GetAllStoresOutputData = GetStoreOutputData[];

// Create
export const CreateStoreInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  address: z
    .string({ error: "address is required" })
    .min(5, { error: "address must be at least 5 letters long" }),
});
export type CreateStoreInputData = z.infer<typeof CreateStoreInputSchema>;
