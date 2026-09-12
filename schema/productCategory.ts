import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";

// Get
export const GetProductCategoryOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  createdAt: z.iso.datetime(),
  organizationId: z.cuid2(),
});
export type GetProductCategoryOutputData = z.infer<
  typeof GetProductCategoryOutputSchema
>;

// Get All
export const GetAllProductCategoryQuerySchema = z.object({
  name: z.string().optional(),
  organizationId: z.cuid2().optional(),
  organizationSlug: z.string().optional(),
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllProductCategoryOutputSchema = createFetchResponseSchema(
  z.object({
    id: z.cuid2(),
    name: z.string(),
    createdAt: z.iso.datetime(),
  }),
);
export type GetAllProductCategoryOutputData = z.infer<
  typeof GetAllProductCategoryOutputSchema
>;

// Create
export const CreateProductCategoryInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),
});
export type CreateProductCategoryInputData = z.input<
  typeof CreateProductCategoryInputSchema
>;
export const CreateProductCategoryOutputSchema =
  GetProductCategoryOutputSchema;

// Delete
export const DeleteProductCategoryParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteProductCategoryParamData = z.infer<
  typeof DeleteProductCategoryParamSchema
>;

export const emptyProductCategory: CreateProductCategoryInputData = {
  name: "",
};
