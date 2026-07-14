import { checkBusinessSlug } from "@/services/business";
import { z } from "zod";

export const businessSchema = z.object({
  name: z.string({ error: "name is required" }).min(3),
  address: z.string({ error: "address is required" }).min(5),
  categoryId: z.cuid2({ error: "select a business category" }),
  phone: z.e164({ error: "phone number is required" }),
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
  storeName: z.string({ error: "store name is required" }).min(3).optional(),
  storeAddress: z
    .string({ error: "store address is required" })
    .min(5)
    .optional(),
});
export type BusinessData = z.infer<typeof businessSchema>;
