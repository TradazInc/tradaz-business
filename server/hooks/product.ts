import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import { ProductData } from "@/schema/product";
import { PRODUCT_KEY } from "@/utilities/cacheKeys";
import { cursorQuery } from "@/utilities/pageQuery";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { Product, productService } from "../entities/product";

export const useProducts = (
  fallbackData?: FetchResponse<Product>[],
  organizationId?: string,
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return organizationId && cursor
        ? [PRODUCT_KEY, { organizationId, ...cursor }]
        : null;
    },
    ([key, query]) => productService.getAll({ query, throw: true }),
    { fallbackData },
  );
};

export const useAddProduct = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? [PRODUCT_KEY, organizationId] : null,
    (key, { arg }: { arg: ProductData }) =>
      productService.post({ body: arg, throw: true }),
  );
};
