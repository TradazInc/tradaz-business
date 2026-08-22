import { z } from "zod";

export const productCategorySchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),
});
export type ProductCategoryData = z.infer<typeof productCategorySchema>;
export type ProductCategoryFormValues = z.input<typeof productCategorySchema>;

export const emptyProductCategory: ProductCategoryFormValues = { name: "" };
