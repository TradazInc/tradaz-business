import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ProductData } from "@/schema/product";
import { PRODUCT_KEY } from "@/data/cacheKeys";
import { getCursorKey } from "@/utilities/getPageKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { Product, productService } from "../entities/product";

export const useProducts = (
  organizationId?: string,
  config?: SWRInfiniteConfig<Product>,
) => {
  return useSWRInfinite(
    getCursorKey(PRODUCT_KEY, { organizationId }),
    ([key, query]) => productService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddProduct = (organizationId?: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    organizationId ? [PRODUCT_KEY, organizationId] : null,
    (key, { arg }: { arg: ProductData }) =>
      productService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
        ),
    },
  );
};
