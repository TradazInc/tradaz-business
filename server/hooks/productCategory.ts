import { PAGE_SIZE } from "@/data/constants";
import { ProductCategoryData } from "@/schema/productCategory";
import { cursorKey, PRODUCT_CATEGORY_KEY } from "@/utilities/cacheKeys";
import { extractSearchParams } from "@/utilities/extractSearchParams";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { FetchResponse } from "../entities/fetchResponse";
import {
  ProductCategory,
  productCategoryService,
} from "../entities/productCategory";

export const useProductCategories = (
  fallbackData?: FetchResponse<ProductCategory>[],
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "product-categories", PAGE_SIZE),
    (url) =>
      productCategoryService.getAll({
        query: extractSearchParams(url),
        throw: true,
      }),
    { fallbackData },
  );
};

export const useAddProductCategory = () => {
  const { mutate } = useProductCategories();

  return useSWRMutation(
    PRODUCT_CATEGORY_KEY,
    (url: string, { arg }: { arg: ProductCategoryData }) =>
      productCategoryService.post({ body: arg, throw: true }),
    { onSuccess: () => mutate() },
  );
};

export const useRemoveProductCategory = () => {
  const { mutate } = useProductCategories();

  return useSWRMutation(
    PRODUCT_CATEGORY_KEY,
    (url: string, { arg }: { arg: string }) =>
      productCategoryService.delete(arg, { throw: true }),
    { onSuccess: () => mutate() },
  );
};
