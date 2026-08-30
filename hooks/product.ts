import { PRODUCT_KEY } from "@/data/cacheKeys";
import { Product, productService } from "@/entities/product";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ProductData } from "@/schema/product";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useProducts = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<Product>,
) => {
  return useSWRInfinite(
    getCursorKey(PRODUCT_KEY, { organizationId }),
    ([key, query]) => productService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddProduct = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(PRODUCT_KEY, organizationId),
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
