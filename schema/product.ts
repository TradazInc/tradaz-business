import { z } from "zod";

const teamVariationSchema = z.object({
  teamId: z.cuid2({ error: "select a team" }),

  quantity: z
    .int({ error: "quantity is required" })
    .positive({ error: "quantity can't be negative" }),
});

const variationSchema = z.object({
  sku: z
    .string({ error: "sku is required" })
    .min(1, { error: "sku is required" }),

  color: z.hex({ error: "color is required" }),

  price: z
    .number({ error: "price is required" })
    .positive({ error: "price can't be negative" }),

  sizeId: z
    .string({ error: "select a size" })
    .min(1, { error: "select a size" }),

  teamVariations: z
    .array(teamVariationSchema)
    .min(1, { error: "add at least one team" }),
});

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
    .positive({ error: "discount can't be negative" })
    .max(100, { error: "discount can't exceed 100%" }),

  categoryId: z.cuid2({ error: "select a category" }),

  sizeTypeId: z.cuid2({ error: "select a size type" }),

  variations: z
    .array(variationSchema)
    .min(1, { error: "add at least one variation" }),

  images: z.array(imageSchema).min(1, { error: "add at least one image" }),
});
export type ProductData = z.infer<typeof productSchema>;
