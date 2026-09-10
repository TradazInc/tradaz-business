import { z } from "zod";

// Get (the API returns the organization's single config, or null)
export const GetUIConfigOutputSchema = z
  .object({
    id: z.cuid2(),
    primaryColor: z.string().nullable(),
    secondaryColor: z.string().nullable(),
    tertiaryColor: z.string().nullable(),
    createdAt: z.string(),
    organizationId: z.cuid2(),
  })
  .nullable();
export type GetUIConfigOutputData = z.infer<typeof GetUIConfigOutputSchema>;

// Upsert
export const UpsertUIConfigInputSchema = z.object({
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
export type UpsertUIConfigInputData = z.input<typeof UpsertUIConfigInputSchema>;

export const UpsertUIConfigOutputSchema = z.object({
  id: z.cuid2(),
  primaryColor: z.string().nullable(),
  secondaryColor: z.string().nullable(),
  tertiaryColor: z.string().nullable(),
  createdAt: z.string(),
  organizationId: z.cuid2(),
});

export const emptyUIConfig: UpsertUIConfigInputData = {
  primaryColor: "#000000",
  secondaryColor: "#000000",
  tertiaryColor: "#000000",
};
