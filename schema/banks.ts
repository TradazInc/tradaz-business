import { z } from "zod";
import { Gateway } from "./enums";

export const GetAllBanksQuerySchema = z.object({
  gateway: z.enum(Gateway),
  country: z.string().min(3),
});
export type GetAllBanksQueryData = z.infer<typeof GetAllBanksQuerySchema>;

export const GetAllBanksOutputSchema = z
  .object({
    name: z.string(),
    code: z.string(),
  })
  .array();
export type GetAllBanksOutputData = z.infer<typeof GetAllBanksOutputSchema>;
