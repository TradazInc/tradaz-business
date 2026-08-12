import { z } from "zod";

export const sizeSchema = z.object({
  value: z
    .string({ error: "value is required" })
    .min(1, { error: "value must be at least 1 letters long" }),
});
export type SizeFormValues = z.input<typeof sizeSchema>;

export const sizeTypeSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  sizes: z.array(sizeSchema).min(1, { error: "add at least one size" }),
});
export type SizeTypeData = z.infer<typeof sizeTypeSchema>;
export type SizeTypeFormValues = z.input<typeof sizeTypeSchema>;
