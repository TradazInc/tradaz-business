import { toaster } from "@/components/ui/toaster";
import { authClient } from "@/lib/authClient";
import { checkBusinessSlug } from "@/server/business";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { z } from "zod";

export const CreateBusinessInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  address: z
    .string({ error: "address is required" })
    .min(5, { error: "address must be at least 5 letters long" }),

  categoryId: z.cuid2({ error: "select a brand category" }),

  phone: z
    .string({ error: "phone number is required" })
    .length(11, { error: "enter a valid phone number" })
    .regex(/^[0-9]+$/, { error: "enter a valid phone number" }), // digits only

  slug: z
    .string({ error: "slug is required" })
    .trim()
    .slugify()
    .refine(
      async (slug) => {
        if (!slug) return true;
        const { data, error } = await checkBusinessSlug(slug);
        if (error) toaster.create(errorToastOptions(error));
        return data?.status;
      },
      { error: "Slug is taken" },
    ),
});
export type CreateBusinessInputData = z.infer<typeof CreateBusinessInputSchema>;

export type Business = typeof authClient.$Infer.Organization;
export type ActiveBusiness = typeof authClient.$Infer.ActiveOrganization;
