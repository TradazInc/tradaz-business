import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";

// Get
export const GetPointsConfigOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string(),
  minOrderValue: z.number(),
  maxOrderValue: z.number(),
  createdAt: z.iso.datetime(),
  rewardPercentage: z.number(),
  organizationId: z.cuid2(),
});
export type GetPointsConfigOutputData = z.infer<
  typeof GetPointsConfigOutputSchema
>;

// Get All
export const GetAllPointsConfigQuerySchema = z.object({
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllPointsConfigOutputSchema = createFetchResponseSchema(
  GetPointsConfigOutputSchema,
);
export type GetAllPointsConfigOutputData = z.infer<
  typeof GetAllPointsConfigOutputSchema
>;

// Create
export const CreatePointsConfigInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  minOrderValue: z
    .number({ error: "minimum order value is required" })
    .nonnegative({ error: "minimum order value cannot be negative or zero" }),

  maxOrderValue: z
    .number({ error: "maximum order value is required" })
    .nonnegative({ error: "maximum order value cannot be negative or zero" }),

  rewardPercentage: z
    .number({ error: "reward percentage is required" })
    .nonnegative({ error: "reward percentage cannot be negative or zero" })
    .max(100, { error: "discount can't exceed 100%" }),
});
export type CreatePointsConfigInputData = z.input<
  typeof CreatePointsConfigInputSchema
>;
export const CreatePointsConfigOutputSchema = GetPointsConfigOutputSchema;

// Update
export const UpdatePointsConfigParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdatePointsConfigInputSchema =
  CreatePointsConfigInputSchema.partial();
export type UpdatePointsConfigInputData = z.input<
  typeof UpdatePointsConfigInputSchema
>;
export const UpdatePointsConfigOutputSchema = GetPointsConfigOutputSchema;

export const emptyPointsConfig: CreatePointsConfigInputData = {
  name: "",
  minOrderValue: 0,
  maxOrderValue: 0,
  rewardPercentage: 0,
};
