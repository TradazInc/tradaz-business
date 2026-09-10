import { PRODUCT_KEY } from "@/data/cacheKeys";
import { apiClient } from "@/lib/fetchClient";
import {
  CreateProductInputData,
  GetAllProductOutputData,
} from "@/schema/product";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useProducts = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllProductOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(PRODUCT_KEY, query),
    ([key, query]) => apiClient("@get/api/products", { query }),
    config,
  );
};

export const useAddProduct = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(PRODUCT_KEY, organizationId),
    (key, { arg }: { arg: CreateProductInputData }) =>
      apiClient("@post/api/products", { body: arg }),
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
      apiClient("@delete/api/products/:id", { params: { id: arg } }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
        ),
    },
  );
};
