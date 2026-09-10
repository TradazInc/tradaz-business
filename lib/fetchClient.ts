import {
  CreateBusinessCategoryInputSchema,
  CreateBusinessCategoryOutputSchema,
  DeleteBusinessCategoryParamSchema,
  GetAllBusinessCategoryOutputSchema,
} from "@/schema/businessCategory";
import { setServerCookie } from "@/utilities/setServerCookie";
import { createFetch, createSchema } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";

export const schema = createSchema({
  "@get/api/business-categories": {
    output: GetAllBusinessCategoryOutputSchema,
  },
  "@post/api/business-categories": {
    input: CreateBusinessCategoryInputSchema,
    output: CreateBusinessCategoryOutputSchema,
  },
  "@delete/api/business-categories": {
    params: DeleteBusinessCategoryParamSchema,
  },
});

export const apiClient = createFetch({
  schema: schema,
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  onRequest: async (context) => setServerCookie(context),
  plugins: [logger()],
});
