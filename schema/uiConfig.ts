import { z } from "zod";

const uiConfigSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  tertiaryColor: z.string(),
});
export type UIConfigData = z.infer<typeof uiConfigSchema>;
export type UIConfigFormValues = z.input<typeof uiConfigSchema>;
