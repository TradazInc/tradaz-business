import { PRODUCT_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateProductInputData,
  GetAllProductOutputData,
  GetAllProductQuerySchema,
  UpdateProductInputData,
  UpdateProductStatusInputData,
} from "@/schema/product";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useProducts = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllProductOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllProductQuerySchema);

  return useSWRInfinite(
    getCursorKey(PRODUCT_KEY, { ...query, organizationId }),
    ([key, query]) => apiClient("@get/api/products", { query, ...apiConfig }),
    config,
  );
};

export const useAddProduct = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: CreateProductInputData }) =>
      apiClient("@post/api/products", { body: arg, ...apiConfig }),
  );
};

export const useUpdateProduct = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateProductInputData } }) =>
      apiClient("@put/api/products/:id", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(PRODUCT_KEY, data.id)),
    },
  );
};

export const useUpdateProductStatus = (
  id: string,
  organizationId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: UpdateProductStatusInputData }) =>
      apiClient("@patch/api/products/:id/status", {
        params: { id },
        body: arg,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(PRODUCT_KEY, data.id)),
    },
  );
};

export const useRemoveProduct = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/products/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
  );
};

export const useRemoveVariation = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/products/variations/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
  );
};

export const useRemoveStoreVariation = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/products/team-variations/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
  );
};
