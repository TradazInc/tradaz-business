import { authClient } from "@/lib/authClient";
import { teamSchema } from "better-auth/client";
import { z } from "zod";

// Get
export const GetStoreOutputSchema = teamSchema;
export type GetStoreOutputData = typeof authClient.$Infer.Team;

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
