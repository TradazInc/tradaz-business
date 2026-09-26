import { z } from "zod";

export const createFetchResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    data: z.array(dataSchema),
    aggregate: z.coerce.number().nullish(),
    meta: z
      .object({
        next: z.string().optional(),
        count: z.number().optional(),
        totalPages: z.number().optional(),
      })
      .optional(),
  });

export type FetchResponse<T> = z.infer<
  ReturnType<typeof createFetchResponseSchema<z.ZodType<T>>>
>;
