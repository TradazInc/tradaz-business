import { z } from "zod";

// Get Upload Signature
export const GetUploadSignatureInputSchema = z.object({
  paramsToSign: z.record(z.string(), z.unknown()),
});
export type GetUploadSignatureInputData = z.infer<
  typeof GetUploadSignatureInputSchema
>;

export const GetUploadSignatureOutputSchema = z.object({
  signature: z.string(),
});
export type GetUploadSignatureOutputData = z.infer<
  typeof GetUploadSignatureOutputSchema
>;
