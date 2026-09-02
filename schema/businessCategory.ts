import { z } from "zod";

export const businessCategorySchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),
});
export type BusinessCategoryData = z.infer<typeof businessCategorySchema>;
