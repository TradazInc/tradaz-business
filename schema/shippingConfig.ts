import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";

// Get
// price is a Prisma Decimal, serialized as a string over JSON
const GetShippingMethodOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  price: z.coerce.number(),
  deliveryDaysMin: z.number(),
  deliveryDaysMax: z.number(),
  createdAt: z.string(),
  shippingConfigId: z.string(),
});
export type GetShippingMethodOutputData = z.infer<
  typeof GetShippingMethodOutputSchema
>;

export const GetShippingConfigOutputSchema = z.object({
  id: z.cuid2(),
  carrier: z.string(),
  createdAt: z.iso.datetime(),
  organizationId: z.cuid2(),
  shippingMethods: z.array(GetShippingMethodOutputSchema),
});
export type GetShippingConfigOutputData = z.infer<
  typeof GetShippingConfigOutputSchema
>;

// Get All
export const GetAllShippingConfigQuerySchema = z.object({
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllShippingConfigOutputSchema = createFetchResponseSchema(
  GetShippingConfigOutputSchema,
);
export type GetAllShippingConfigOutputData = z.infer<
  typeof GetAllShippingConfigOutputSchema
>;

// Create
export const CreateShippingMethodInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(2, { error: "name must be at least 2 letters long" }),

  price: z
    .number({ error: "price is required" })
    .nonnegative({ error: "price cannot be negative" }),

  deliveryDaysMin: z
    .int({ error: "minimum delivery days is required" })
    .nonnegative({ error: "minimum delivery days cannot be negative" }),

  deliveryDaysMax: z
    .int({ error: "maximum delivery days is required" })
    .nonnegative({ error: "maximum delivery days cannot be negative" }),
});
export type CreateShippingMethodInputData = z.input<
  typeof CreateShippingMethodInputSchema
>;

export const CreateShippingConfigInputSchema = z.object({
  carrier: z
    .string({ error: "carrier is required" })
    .min(2, { error: "carrier must be at least 2 letters long" }),

  shippingMethods: z
    .array(CreateShippingMethodInputSchema)
    .min(1, { error: "add at least one method" }),
});
export type CreateShippingConfigInputData = z.input<
  typeof CreateShippingConfigInputSchema
>;
export const CreateShippingConfigOutputSchema = GetShippingConfigOutputSchema;

// Update
export const UpdateShippingConfigParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdateShippingConfigInputSchema =
  CreateShippingConfigInputSchema.partial().extend({
    shippingMethods: z
      .array(
        CreateShippingMethodInputSchema.extend({ id: z.cuid2().optional() }),
      )
      .min(1, { error: "add at least one method" })
      .optional(),
  });
export type UpdateShippingConfigInputData = z.input<
  typeof UpdateShippingConfigInputSchema
>;
export const UpdateShippingConfigOutputSchema = GetShippingConfigOutputSchema;

// Delete
export const DeleteShippingConfigParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteShippingConfigParamData = z.infer<
  typeof DeleteShippingConfigParamSchema
>;

export const DeleteShippingMethodParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteShippingMethodParamData = z.infer<
  typeof DeleteShippingMethodParamSchema
>;

export const emptyShippingMethod: CreateShippingMethodInputData = {
  name: "",
  price: 0,
  deliveryDaysMin: 0,
  deliveryDaysMax: 0,
};

export const emptyShippingConfig: CreateShippingConfigInputData = {
  carrier: "",
  shippingMethods: [emptyShippingMethod],
};
