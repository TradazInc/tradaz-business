import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";

// Get
export const GetBusinessCategoryOuputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
});

// Get All
export const GetAllBusinessCategoryOutputSchema = createFetchResponseSchema(
  GetBusinessCategoryOuputSchema,
);
export type GetAllBusinessCategoryOutputData = z.infer<
  typeof GetAllBusinessCategoryOutputSchema
>;

// Create
export const CreateBusinessCategoryInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),
});
export type CreateBusinessCategoryInputData = z.infer<
  typeof CreateBusinessCategoryInputSchema
>;
export const CreateBusinessCategoryOutputSchema =
  GetBusinessCategoryOuputSchema;

// Delete
export const DeleteBusinessCategoryParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteBusinessCategoryParamData = z.infer<
  typeof DeleteBusinessCategoryParamSchema
>;
