import { PRODUCT_CATEGORY_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateProductCategoryInputData,
  GetAllProductCategoryOutputData,
  GetAllProductCategoryQuerySchema,
} from "@/schema/productCategory";
import { getCursorKey } from "@/utilities/computeKey";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useProductCategories = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllProductCategoryOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllProductCategoryQuerySchema);

  return useSWRInfinite(
    getCursorKey(PRODUCT_CATEGORY_KEY, { ...query, organizationId }),
    ([key, query]) =>
      apiClient("@get/api/product-categories", { query, ...apiConfig }),
    config,
  );
};

export const useAddProductCategory = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_CATEGORY_KEY, { organizationId })),
    (key, { arg }: { arg: CreateProductCategoryInputData }) =>
      apiClient("@post/api/product-categories", { body: arg, ...apiConfig }),
  );
};

export const useRemoveProductCategory = (
  organizationId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_CATEGORY_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/product-categories/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
  );
};
