import {
  CreateBusinessCategoryInputSchema,
  CreateBusinessCategoryOutputSchema,
  DeleteBusinessCategoryParamSchema,
  GetAllBusinessCategoryOutputSchema,
} from "@/schema/businessCategory";
import { createFetch, createSchema } from "@better-fetch/fetch";

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
  baseURL: "https://jsonplaceholder.typicode.com",
  schema: schema,
});
