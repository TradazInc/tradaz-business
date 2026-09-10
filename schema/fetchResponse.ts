import { z } from "zod";

export const createFetchResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T,
) =>
  z.object({
    data: z.array(dataSchema),
    aggregate: z.number().optional(),
    meta: z
      .object({
        next: z.string().optional(),
        count: z.number().optional(),
        totalPages: z.number().optional(),
      })
      .optional(),
  });
