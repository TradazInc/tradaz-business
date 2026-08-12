import { z } from "zod";

export const sizeSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),
});
export type SizeFormValues = z.input<typeof sizeSchema>;

export const sizeTypeSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  sizes: z.array(sizeSchema).min(1, { error: "add at least one team" }),
});
export type SizeTypeData = z.infer<typeof sizeTypeSchema>;
