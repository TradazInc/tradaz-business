import { z } from "zod";
import { Gateway } from "./enums";
import { createFetchResponseSchema } from "./fetchResponse";

// Get All
export const GetAllBanksQuerySchema = z
  .object({
    gateway: z.enum(Gateway, { error: "Gateway is required" }),
    country: z.string().optional(),
  })
  .refine((ctx) => ctx.gateway === Gateway.paystack && !ctx.country, {
    error: "Country is required",
  });
export type GetAllBanksQueryData = z.infer<typeof GetAllBanksQuerySchema>;

export const GetAllBanksOutputSchema = createFetchResponseSchema(
  z.object({
    name: z.string(),
    code: z.string(),
  }),
);
export type GetAllBanksOutputData = z.infer<typeof GetAllBanksOutputSchema>;
