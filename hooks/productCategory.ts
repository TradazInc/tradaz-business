import { PRODUCT_CATEGORY_KEY } from "@/data/cacheKeys";
import {
  ProductCategory,
  productCategoryService,
} from "@/entities/productCategory";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ProductCategoryData } from "@/schema/productCategory";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useProductCategories = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<ProductCategory>,
) => {
  return useSWRInfinite(
    getCursorKey(PRODUCT_CATEGORY_KEY, { organizationId }),
    ([key, query]) => productCategoryService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddProductCategory = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(PRODUCT_CATEGORY_KEY, organizationId),
    (key, { arg }: { arg: ProductCategoryData }) =>
      productCategoryService.post({ body: arg, throw: true }),
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
      productCategoryService.delete(arg, { throw: true }),
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
