import { z } from "zod";

export const shippingMethodSchema = z.object({
  name: z.string(),
  price: z.number(),
  deliveryDaysMin: z.number(),
  deliveryDaysMax: z.number(),
});

export type ShippingMethodData = z.infer<typeof shippingMethodSchema>;
export type ShippingMethodFormValues = z.input<typeof shippingMethodSchema>;

export const shippingConfigSchema = z.object({
  carrier: z.string(),
  shippingMethods: z
    .array(shippingMethodSchema)
    .min(1, { error: "add at least one method" }),
});

export type ShippingConfigData = z.infer<typeof shippingConfigSchema>;
export type ShippingConfigFormValues = z.input<typeof shippingConfigSchema>;
