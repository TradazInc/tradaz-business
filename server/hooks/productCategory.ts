import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ProductCategoryData } from "@/schema/productCategory";
import { PRODUCT_CATEGORY_KEY } from "@/data/cacheKeys";
import { getCursorKey } from "@/utilities/getPageKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";
import {
  ProductCategory,
  productCategoryService,
} from "../entities/productCategory";

export const useProductCategories = (
  organizationId?: string,
  config?: SWRInfiniteConfig<ProductCategory>,
) => {
  return useSWRInfinite(
    getCursorKey(PRODUCT_CATEGORY_KEY, { organizationId }),
    ([key, query]) => productCategoryService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddProductCategory = (organizationId?: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    organizationId ? [PRODUCT_CATEGORY_KEY, organizationId] : null,
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

export const useRemoveProductCategory = (organizationId?: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    organizationId ? [PRODUCT_CATEGORY_KEY, organizationId] : null,
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
