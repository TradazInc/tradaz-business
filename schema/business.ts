import { checkBusinessSlug } from "@/services/business";
import { z } from "zod";

export const businessSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  address: z
    .string({ error: "address is required" })
    .min(5, { error: "address must be at least 5 letters long" }),

  categoryId: z
    .array(z.cuid2(), { error: "select a brand category" })
    .length(1, { error: "select one brand category" })
    .transform(([id]) => id),

  phone: z
    .string({ error: "phone number is required" })
    .transform((value) => value.replace(/[^\d+]/g, ""))
    .pipe(z.e164({ error: "enter a valid phone number" })),

  slug: z
    .string({ error: "slug is required" })
    .trim()
    .slugify()
    .refine(
      async (slug) => {
        if (!slug) return true;
        const result = await checkBusinessSlug(slug);
        return result.status;
      },
      { error: "Slug is taken!" },
    ),
});
export type BusinessData = z.infer<typeof businessSchema>;
