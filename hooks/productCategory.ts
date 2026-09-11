import { PRODUCT_CATEGORY_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateProductCategoryInputData,
  GetAllProductCategoryOutputData,
} from "@/schema/productCategory";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useProductCategories = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllProductCategoryOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(PRODUCT_CATEGORY_KEY, query),
    ([key, query]) =>
      apiClient("@get/api/product-categories", { query, ...apiConfig }),
    config,
  );
};

export const useAddProductCategory = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(PRODUCT_CATEGORY_KEY, organizationId),
    (key, { arg }: { arg: CreateProductCategoryInputData }) =>
      apiClient("@post/api/product-categories", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(PRODUCT_CATEGORY_KEY, { organizationId }),
          ),
        ),
    },
  );
};

export const useRemoveProductCategory = (
  organizationId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(PRODUCT_CATEGORY_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/product-categories/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(PRODUCT_CATEGORY_KEY, { organizationId }),
          ),
        ),
    },
  );
};
