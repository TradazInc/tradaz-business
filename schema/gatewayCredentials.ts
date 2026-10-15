import { z } from "zod";
import { Gateway } from "./enums";

// Gateway Credentials
const MoniepointPosCredentialsSchema = z.object({
  apiKey: z
    .string({ error: "api key is required" })
    .min(1, { error: "api key is required" }),
});

const OpayPosCredentialsSchema = z.object({
  apiKey: z
    .string({ error: "client auth key is required" })
    .min(1, { error: "client auth key is required" }),
  headMerchantId: z
    .string({ error: "head merchant id is required" })
    .min(1, { error: "head merchant id is required" }),
  merchantId: z.string().min(1).optional(), // branch; defaults to headMerchantId
  subSceneEnum: z
    .string({ error: "sub scene is required" })
    .min(1, { error: "sub scene is required" }),
  merchantPrivateKey: z
    .string({ error: "merchant private key is required" })
    .min(1, { error: "merchant private key is required" }),
  gatewayPublicKey: z
    .string({ error: "gateway public key is required" })
    .min(1, { error: "gateway public key is required" }),
});

// Map Gateway to Schema
export const PosCredentialsSchemas: Partial<Record<Gateway, z.ZodObject>> = {
  [Gateway.opay]: OpayPosCredentialsSchema,
  [Gateway.moniepoint]: MoniepointPosCredentialsSchema,
};

// Merge Gatway Schemas
export const PosCredentialsSchema = z
  .object({})
  .extend(MoniepointPosCredentialsSchema.shape)
  .extend(OpayPosCredentialsSchema.shape)
  .partial();
export type PosCredentialsData = z.infer<typeof PosCredentialsSchema>;
