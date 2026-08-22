import { z } from "zod";

export const pointsConfigSchema = z.object({
  name: z.string({ error: "name is required" }).min(3),

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
export type PointsConfigData = z.infer<typeof pointsConfigSchema>;
export type PointsConfigFormValues = z.input<typeof pointsConfigSchema>;

export const emptyPointsConfig: PointsConfigFormValues = {
  name: "",
  minOrderValue: 0,
  maxOrderValue: 0,
  rewardPercentage: 0,
};
