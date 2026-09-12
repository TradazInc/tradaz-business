import { z } from "zod";
import { createFetchResponseSchema } from "./fetchResponse";
import { Gateway } from "./enums";

// Get
const GetTerminalConfigOutputSchema = z.object({
  id: z.cuid2(),
  name: z.string().nullable(),
  serialNumber: z.string(),
  createdAt: z.iso.datetime(),
  posconfigId: z.cuid2(),
});

export const GetPosConfigOutputSchema = z.object({
  id: z.cuid2(),
  gateway: z.enum(Gateway),
  merchantId: z.string().nullable(),
  privateKey: z.string(),
  createdAt: z.iso.datetime(),
  teamId: z.cuid2(),
  terminalConfigs: z.array(GetTerminalConfigOutputSchema),
});
export type GetPosConfigOutputData = z.infer<typeof GetPosConfigOutputSchema>;

// Get All
export const GetAllPosConfigQuerySchema = z.object({
  cursor: z.cuid2().optional(),
  pageSize: z.number().positive().optional(),
});

export const GetAllPosConfigOutputSchema = createFetchResponseSchema(
  GetPosConfigOutputSchema,
);
export type GetAllPosConfigOutputData = z.infer<
  typeof GetAllPosConfigOutputSchema
>;

// Create
export const CreateTerminalConfigInputSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(2, { error: "name must be at least 2 letters long" }),

  serialNumber: z
    .string({ error: "serial number is required" })
    .min(1, { error: "serial number is required" }),
});
export type CreateTerminalConfigInputData = z.input<
  typeof CreateTerminalConfigInputSchema
>;

export const CreatePosConfigInputSchema = z.object({
  gateway: z.enum(Gateway, { error: "select a gateway" }),

  merchantId: z
    .string({ error: "merchant id is required" })
    .min(1, { error: "merchant id is required" }),

  privateKey: z
    .string({ error: "private key is required" })
    .min(1, { error: "private key is required" }),

  terminalConfigs: z
    .array(CreateTerminalConfigInputSchema)
    .min(1, { error: "add at least one terminal" }),
});
export type CreatePosConfigInputData = z.input<
  typeof CreatePosConfigInputSchema
>;
export const CreatePosConfigOutputSchema = GetPosConfigOutputSchema;

// Update
export const UpdatePosConfigParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdatePosConfigInputSchema =
  CreatePosConfigInputSchema.partial().extend({
    terminalConfigs: z
      .array(
        CreateTerminalConfigInputSchema.extend({ id: z.cuid2().optional() }),
      )
      .min(1, { error: "add at least one terminal" })
      .optional(),
  });
export type UpdatePosConfigInputData = z.input<
  typeof UpdatePosConfigInputSchema
>;
export const UpdatePosConfigOutputSchema = GetPosConfigOutputSchema;

// Delete
export const DeletePosConfigParamSchema = z.object({
  id: z.cuid2(),
});
export type DeletePosConfigParamData = z.infer<
  typeof DeletePosConfigParamSchema
>;

export const DeleteTerminalConfigParamSchema = z.object({
  id: z.cuid2(),
});
export type DeleteTerminalConfigParamData = z.infer<
  typeof DeleteTerminalConfigParamSchema
>;

export const emptyTerminalConfig: CreateTerminalConfigInputData = {
  name: "",
  serialNumber: "",
};

export const emptyPosConfig: CreatePosConfigInputData = {
  gateway: Gateway.paystack,
  merchantId: "",
  privateKey: "",
  terminalConfigs: [emptyTerminalConfig],
};
