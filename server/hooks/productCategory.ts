import { PAGE_SIZE } from "@/data/constants";
import { cursorKey, PRODUCT_CATEGORY_KEY } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import {
  ProductCategory,
  productCategoryService,
} from "../entities/productCategory";
import useSWRMutation from "swr/mutation";
import { ProductCategoryData } from "@/schema/productCategory";
import { FetchResponse } from "../entities/fetchResponse";

export const useProductCategories = (
  fallbackData?: FetchResponse<ProductCategory>[],
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "product-categories", PAGE_SIZE),
    () => productCategoryService.getAll({ throw: true }),
    { fallbackData },
  );
};

export const useAddProductCategory = () => {
  return useSWRMutation(
    PRODUCT_CATEGORY_KEY,
    (url: string, { arg }: { arg: ProductCategoryData }) =>
      productCategoryService.post({ body: arg, throw: true }),
  );
};

export const useRemoveProductCategory = () => {
  return useSWRMutation(
    PRODUCT_CATEGORY_KEY,
    (url: string, { arg }: { arg: string }) =>
      productCategoryService.delete(arg, { throw: true }),
  );
};
