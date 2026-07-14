import { z } from "zod";

export const storeSchema = z.object({
  name: z
    .string({ error: "name is required" })
    .min(3, { error: "name must be at least 3 letters long" }),

  address: z
    .string({ error: "address is required" })
    .min(5, { error: "address must be at least 5 letters long" }),
});
export type StoreData = z.infer<typeof storeSchema>;
