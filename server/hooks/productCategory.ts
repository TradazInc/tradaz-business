import { PAGE_SIZE } from "@/data/constants";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ProductCategoryData } from "@/schema/productCategory";
import { PRODUCT_CATEGORY_KEY } from "@/utilities/cacheKeys";
import { cursorQuery } from "@/utilities/pageQuery";
import useSWRInfinite from "swr/infinite";
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
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return organizationId && cursor
        ? [PRODUCT_CATEGORY_KEY, { organizationId, ...cursor }]
        : null;
    },
    ([key, query]) => productCategoryService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddProductCategory = (organizationId?: string) => {
  const { mutate } = useProductCategories(organizationId, {
    revalidateOnMount: true,
  });

  return useSWRMutation(
    organizationId ? [PRODUCT_CATEGORY_KEY, organizationId] : null,
    (key, { arg }: { arg: ProductCategoryData }) =>
      productCategoryService.post({ body: arg, throw: true }),
    { onSuccess: () => mutate() },
  );
};

export const useRemoveProductCategory = (organizationId?: string) => {
  const { mutate } = useProductCategories(organizationId, {
    revalidateOnMount: true,
  });

  return useSWRMutation(
    organizationId ? [PRODUCT_CATEGORY_KEY, organizationId] : null,
    (key, { arg }: { arg: string }) =>
      productCategoryService.delete(arg, { throw: true }),
    { onSuccess: () => mutate() },
  );
};
