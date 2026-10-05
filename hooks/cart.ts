import { CART_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateCartInputData,
  CreateCartItemInputData,
  GetAllCartsOutputData,
  GetAllCartsQuerySchema,
  GetCartOutputData,
  UpdateCartInputData,
} from "@/schema/cart";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const useCarts = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllCartsOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllCartsQuerySchema);

  return useSWRInfinite(
    getCursorKey(CART_KEY, { ...query, organizationId }),
    ([key, query]) => apiClient("@get/api/cart", { query, ...apiConfig }),
    config,
  );
};

export const useCart = (
  id?: string,
  config?: SWRConfiguration<GetCartOutputData, Error>,
) => {
  return useSWR(
    getScopedKey(CART_KEY, id),
    ([key, id]) =>
      apiClient("@get/api/cart/:id", { params: { id }, ...apiConfig }),
    config,
  );
};

export const useAddCart = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(CART_KEY, { organizationId })),
    (key, { arg }: { arg: CreateCartInputData }) =>
      apiClient("@post/api/cart", { body: arg, ...apiConfig }),
  );
};

export const useUpdateCart = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(CART_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateCartInputData } }) =>
      apiClient("@put/api/cart/:id", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(CART_KEY, data.id)),
    },
  );
};

export const useRemoveCart = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(CART_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/cart/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(CART_KEY, data.id)),
    },
  );
};

export const useAddCartItem = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(CART_KEY, { organizationId })),
    (key, { arg }: { arg: CreateCartItemInputData }) =>
      apiClient("@post/api/cart/item", { body: arg, ...apiConfig }),
    {
      onSuccess: (data) => mutate(getScopedKey(CART_KEY, data.cartId)),
    },
  );
};

export const useIncrementCartItem = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(CART_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@post/api/cart/item/increment", {
        body: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(CART_KEY, data.cartId)),
    },
  );
};

export const useDecrementCartItem = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(CART_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@post/api/cart/item/decrement", {
        body: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(CART_KEY, data.cartId)),
    },
  );
};

export const useRemoveCartItem = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(CART_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/cart/item/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(CART_KEY, data.cartId)),
    },
  );
};
