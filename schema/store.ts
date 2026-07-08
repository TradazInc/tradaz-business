import { z } from "zod";

export const storeSchema = z.object({
  name: z.string({ error: "name is required" }).min(3),
  address: z.string({ error: "address is required" }).min(5),
});
