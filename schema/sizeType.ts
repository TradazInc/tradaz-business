import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";

// Get
export const GetSizeTypeParamSchema = z.object({
  id: z.cuid2(),
});

export const SizeOutputSchema = z.object({
  id: z.cuid2(),
  value: z.string(),
  createdAt: z.string(),
  sizeTypeId: z.cuid2(),
});
export type SizeOutputData = z.infer<typeof SizeOutputSchema>;

export const GetSizeTypeOutputSchema = z
  .object({
    id: z.cuid2(),
    name: z.string(),
    createdAt: z.string(),
    organizationId: z.cuid2(),
    sizes: z.array(SizeOutputSchema),
  })
  .nullable();
export type GetSizeTypeOutputData = z.infer<typeof GetSizeTypeOutputSchema>;

// Get All
export const GetAllSizeTypeQuerySchema = z.object({
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllSizeTypeOutputSchema = createFetchResponseSchema(
  z.object({
    id: z.cuid2(),
    name: z.string(),
    createdAt: z.string(),
    organizationId: z.cuid2(),
    sizes: z.array(SizeOutputSchema),
  }),
);
export type GetAllSizeTypeOutputData = z.infer<
  typeof GetAllSizeTypeOutputSchema
>;

// Create
export const CreateSizeInputSchema = z.object({
  value: z
    .string({ error: "value is required" })
    .min(1, { error: "value must be at least 1 letter long" }),
});
export type CreateSizeInputData = z.input<typeof CreateSizeInputSchema>;

export const CreateSizeTypeInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  sizes: z
    .array(CreateSizeInputSchema)
    .min(1, { error: "add at least one size" }),
});
export type CreateSizeTypeInputData = z.input<typeof CreateSizeTypeInputSchema>;

export const CreateSizeTypeOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  createdAt: z.string(),
  organizationId: z.cuid2(),
});

// Update
export const UpdateSizeTypeParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdateSizeTypeInputSchema = z.object({
  name: z
    .string()
    .min(3, { error: "name must be at least 3 letters long" })
    .optional(),

  sizes: z
    .array(CreateSizeInputSchema.extend({ id: z.cuid2().optional() }))
    .min(1, { error: "add at least one size" })
    .optional(),
});
export type UpdateSizeTypeInputData = z.input<typeof UpdateSizeTypeInputSchema>;
export const UpdateSizeTypeOutputSchema = CreateSizeTypeOutputSchema;

// Delete
export const DeleteSizeTypeParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteSizeTypeParamData = z.infer<
  typeof DeleteSizeTypeParamSchema
>;

export const DeleteSizeParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteSizeParamData = z.infer<typeof DeleteSizeParamSchema>;

export const emptySize: CreateSizeInputData = {
  value: "",
};

export const emptySizeType: CreateSizeTypeInputData = {
  name: "",
  sizes: [emptySize],
};
