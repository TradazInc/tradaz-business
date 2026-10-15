import type { DefaultValues } from "react-hook-form";
import { z } from "zod";
import { createFetchResponseSchema } from "../utilities/fetchResponse";
import { Gateway } from "./enums";
import {
  PosCredentialsData,
  PosCredentialsSchema,
  PosCredentialsSchemas,
} from "./gatewayCredentials";

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
  credentials: z.record(z.string(), z.string()),
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

// Checks credentials against the selected gateway's schema
const refinePosCredentials = (
  gateway: Gateway,
  credentials: PosCredentialsData,
  ctx: z.RefinementCtx,
) => {
  const schema = PosCredentialsSchemas[gateway];
  if (!schema)
    return ctx.addIssue({
      code: "custom",
      path: ["gateway"],
      message: `${gateway} does not support pos`,
    });

  const result = schema.safeParse(credentials);
  for (const issue of result.error?.issues ?? [])
    ctx.addIssue({
      code: "custom",
      message: issue.message,
      path: ["credentials", ...issue.path],
    });
};

const BasePosConfigInputSchema = z.object({
  gateway: z.enum([Gateway.opay, Gateway.moniepoint], {
    error: "select a gateway",
  }),
  credentials: PosCredentialsSchema,
  terminalConfigs: z
    .array(CreateTerminalConfigInputSchema)
    .min(1, { error: "add at least one terminal" }),
});

export const CreatePosConfigInputSchema = BasePosConfigInputSchema.superRefine(
  (posConfig, ctx) =>
    refinePosCredentials(posConfig.gateway, posConfig.credentials, ctx),
);
export type CreatePosConfigInputData = z.input<
  typeof CreatePosConfigInputSchema
>;
export const CreatePosConfigOutputSchema = GetPosConfigOutputSchema;

// Update
export const UpdatePosConfigParamSchema = z.object({
  id: z.cuid2(),
});

export const UpdatePosConfigInputSchema = BasePosConfigInputSchema.extend({
  terminalConfigs: z
    .array(CreateTerminalConfigInputSchema.extend({ id: z.cuid2().optional() }))
    .min(1, { error: "add at least one terminal" }),
})
  .partial()
  .superRefine(({ gateway, credentials }, ctx) => {
    if (gateway && credentials)
      return refinePosCredentials(gateway, credentials, ctx);

    // otherwise only terminals are being updated
    if (gateway || credentials)
      ctx.addIssue({
        code: "custom",
        path: [gateway ? "credentials" : "gateway"],
        message: "gateway and credentials must be updated together",
      });
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

// No gateway by default, so every credential field starts disabled
export const emptyPosConfig: DefaultValues<CreatePosConfigInputData> = {
  credentials: {}, // blank credentials stay undefined, so they aren't sent
  terminalConfigs: [emptyTerminalConfig],
};
