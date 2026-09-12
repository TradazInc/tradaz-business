import { z } from "zod";
import { Gateway } from "./enums";
import { createFetchResponseSchema } from "./fetchResponse";

// Get All
export const GetAllCountriesQuerySchema = z.object({
  gateway: z.enum(Gateway, { error: "Gateway is required" }),
});
export type GetAllCountriesQueryData = z.infer<
  typeof GetAllCountriesQuerySchema
>;

export const GetAllCountriesOutputSchema = createFetchResponseSchema(
  z.object({
    id: z.number(),
    name: z.string(),
    isoCode: z.string(),
  }),
);
export type GetAllCountriesOutputData = z.infer<
  typeof GetAllCountriesOutputSchema
>;
