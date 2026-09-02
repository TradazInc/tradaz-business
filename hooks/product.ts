import { PRODUCT_KEY } from "@/data/cacheKeys";
import { Product, productService } from "@/entities/product";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ProductData } from "@/schema/product";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useProducts = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<Product>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(PRODUCT_KEY, query),
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

export const useRemoveProduct = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(PRODUCT_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      productService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
        ),
    },
  );
};
