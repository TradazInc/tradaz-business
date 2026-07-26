import { z } from "zod";

const teamVariationSchema = z.object({
  teamId: z
    .array(z.cuid2(), { error: "select a team" })
    .length(1, { error: "select one team" })
    .transform(([id]) => id),

  quantity: z
    .int({ error: "quantity is required" })
    .positive({ error: "quantity cannot be negative or zero" }),
});
export type TeamVariationData = z.infer<typeof teamVariationSchema>;
export type TeamVariationFormValues = z.input<typeof teamVariationSchema>;

const variationSchema = z.object({
  sku: z
    .string({ error: "sku is required" })
    .min(1, { error: "sku is required" }),

  color: z
    .string({ error: "color is required" })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: "select a valid color" }),

  price: z
    .number({ error: "price is required" })
    .positive({ error: "price cannot be negative or zero" }),

  sizeId: z
    .array(z.cuid2(), { error: "select a size" })
    .length(1, { error: "select one size" })
    .transform(([id]) => id),

  teamVariations: z
    .array(teamVariationSchema)
    .min(1, { error: "add at least one team" })
    .superRefine((tv, ctx) => {
      const seen = new Set<string>();

      tv.forEach(({ teamId }, index) => {
        if (seen.has(teamId))
          ctx.addIssue({
            code: "custom",
            path: [index, "teamId"],
            message: "store is already selected",
          });

        seen.add(teamId);
      });
    }),
});
export type VariationData = z.infer<typeof variationSchema>;
export type VariationFormValues = z.input<typeof variationSchema>;

const imageSchema = z.object({
  url: z.url({ error: "enter a valid image url" }),
});

export const productSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  brand: z
    .string({ error: "brand is required" })
    .min(1, { error: "brand is required" }),

  gender: z.enum(["male", "female", "unisex"], { error: "select a gender" }),

  description: z
    .string({ error: "description is required" })
    .min(1, { error: "description is required" }),

  discountPercentage: z
    .number({ error: "discount is required" })
    .nonnegative({ error: "discount cannot be negative" })
    .max(100, { error: "discount can't exceed 100%" }),

  categoryId: z
    .array(z.cuid2(), { error: "select a product category" })
    .length(1, { error: "select one product category" })
    .transform(([id]) => id),

  sizeTypeId: z
    .array(z.cuid2(), { error: "select a size type" })
    .length(1, { error: "select one size type" })
    .transform(([id]) => id),

  variations: z
    .array(variationSchema)
    .min(1, { error: "add at least one variation" }),

  images: z.array(imageSchema).min(1, { error: "add at least one image" }),
});
export type ProductData = z.infer<typeof productSchema>;
export type ProductFormValues = z.input<typeof productSchema>;
