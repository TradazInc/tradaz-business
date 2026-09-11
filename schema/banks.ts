import { z } from "zod";
import { Gateway } from "./enums";

// Get All
export const GetAllBanksQuerySchema = z.object({
  gateway: z.enum(Gateway, { error: "Gateway is required" }),
  country: z.string({ error: "Country is required" }),
});
export type GetAllBanksQueryData = z.infer<typeof GetAllBanksQuerySchema>;

export const GetAllBanksOutputSchema = z
  .object({
    name: z.string(),
    code: z.string(),
  })
  .array();
export type GetAllBanksOutputData = z.infer<typeof GetAllBanksOutputSchema>;
