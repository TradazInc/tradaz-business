import { z } from "zod";

// Create
export const CreateCheckoutInputSchema = z.object({
  id: z.cuid2(),
});
export type CreateCheckoutInputData = z.infer<typeof CreateCheckoutInputSchema>;

export const CreateWebCheckoutOutputSchema = z.object({
  url: z.url(),
  accessCode: z.string().optional(),
  externalTxId: z.string().optional(),
});
export type CreateWebCheckoutOutputData = z.infer<
  typeof CreateWebCheckoutOutputSchema
>;

export const CreatePosCheckoutOutputSchema = z.object({
  status: z.number(),
});
export type CreatePosCheckoutOutputData = z.infer<
  typeof CreatePosCheckoutOutputSchema
>;
