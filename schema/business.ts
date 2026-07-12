import { z } from "zod";

export const businessSchema = z.object({
  name: z.string({ error: "name is required" }).min(3),
  address: z.string({ error: "address is required" }).min(5),
  categoryId: z.cuid2({ error: "select a business category" }),
  phone: z.e164({ error: "phone number is required" }),
  slug: z.string({ error: "slug is required" }).trim().slugify(),
});
export type BusinessData = z.infer<typeof businessSchema>

export const businessInfoSchema = businessSchema.pick({
  name: true,
  categoryId: true,
});
export const contactInfoSchema = businessSchema.pick({
  slug: true,
  address: true,
  phone: true,
});

