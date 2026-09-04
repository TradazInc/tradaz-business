import { z } from "zod";

export const terminalConfigSchema = z.object({
  name: z.string(),
  serialNumber: z.string(),
});

export type TerminalConfigData = z.infer<typeof terminalConfigSchema>;
export type TerminalConfigFormValues = z.input<typeof terminalConfigSchema>;

export const posConfigSchema = z.object({
  gateway: z.string(),
  merchantId: z.string(),
  privateKey: z.string(),
  terminalConfigs: z
    .array(terminalConfigSchema)
    .min(1, { error: "add at least one terminal" }),
});

export type PosConfigData = z.infer<typeof posConfigSchema>;
export type PosConfigFormValues = z.input<typeof posConfigSchema>;
