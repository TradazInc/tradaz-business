import { ProductData } from "@/schema/product";
import { cursorKey, PRODUCT_KEY } from "@/utilities/cacheKeys";
import useSWRMutation from "swr/mutation";
import { Product, productService } from "../entities/product";
import { FetchResponse } from "../entities/fetchResponse";
import { PAGE_SIZE } from "@/data/constants";
import useSWRInfinite from "swr/infinite";

export const useProducts = (fallbackData: FetchResponse<Product>[]) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "products", PAGE_SIZE),
    () => productService.getAll({ throw: true }),
    { fallbackData },
  );
};

export const useAddProduct = () => {
  return useSWRMutation(
    PRODUCT_KEY,
    (url: string, { arg }: { arg: ProductData }) =>
      productService.post({ body: arg, throw: true }),
  );
};
