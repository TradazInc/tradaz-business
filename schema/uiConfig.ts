import { z } from "zod";

// Get (the API returns the organization's single config, or null)
export const GetUIConfigOutputSchema = z
  .object({
    id: z.cuid2(),
    primaryColor: z.string().nullable(),
    secondaryColor: z.string().nullable(),
    tertiaryColor: z.string().nullable(),
    createdAt: z.iso.datetime(),
    organizationId: z.cuid2(),
  })
  .nullable();
export type GetUIConfigOutputData = z.infer<typeof GetUIConfigOutputSchema>;

// Create
export const CreateUIConfigInputSchema = z.object({
  primaryColor: z
    .string({ error: "primary color is required" })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: "select a valid color" }),

  secondaryColor: z
    .string({ error: "secondary color is required" })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: "select a valid color" }),

  tertiaryColor: z
    .string({ error: "tertiary color is required" })
    .regex(/^#[0-9a-fA-F]{6}$/, { error: "select a valid color" }),
});
export type CreateUIConfigInputData = z.input<typeof CreateUIConfigInputSchema>;

export const CreateUIConfigOutputSchema = z.object({
  id: z.cuid2(),
  primaryColor: z.string().nullable(),
  secondaryColor: z.string().nullable(),
  tertiaryColor: z.string().nullable(),
  createdAt: z.iso.datetime(),
  organizationId: z.cuid2(),
});

// Delete
export const DeleteUIConfigOutputSchema = CreateUIConfigOutputSchema.pick({
  id: true,
});

export const emptyUIConfig: CreateUIConfigInputData = {
  primaryColor: "#000000",
  secondaryColor: "#000000",
  tertiaryColor: "#000000",
};
