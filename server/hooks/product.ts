import { PAGE_SIZE } from "@/data/constants";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ProductData } from "@/schema/product";
import { PRODUCT_KEY } from "@/utilities/cacheKeys";
import { cursorQuery } from "@/utilities/pageQuery";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { Product, productService } from "../entities/product";

export const useProducts = (
  organizationId?: string,
  config?: SWRInfiniteConfig<Product>,
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return organizationId && cursor
        ? [PRODUCT_KEY, { organizationId, ...cursor }]
        : null;
    },
    ([key, query]) => productService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddProduct = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? [PRODUCT_KEY, organizationId] : null,
    (key, { arg }: { arg: ProductData }) =>
      productService.post({ body: arg, throw: true }),
  );
};
