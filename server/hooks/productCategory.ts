import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
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
  fallbackData?: FetchResponse<ProductCategory>[],
  organizationId?: string,
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return organizationId && cursor
        ? [PRODUCT_CATEGORY_KEY, { organizationId, ...cursor }]
        : null;
    },
    ([key, query]) => productCategoryService.getAll({ query, throw: true }),
    { fallbackData },
  );
};

export const useAddProductCategory = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? [PRODUCT_CATEGORY_KEY, organizationId] : null,
    (key, { arg }: { arg: ProductCategoryData }) =>
      productCategoryService.post({ body: arg, throw: true }),
  );
};

export const useRemoveProductCategory = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? [PRODUCT_CATEGORY_KEY, organizationId] : null,
    (key, { arg }: { arg: string }) =>
      productCategoryService.delete(arg, { throw: true }),
  );
};
