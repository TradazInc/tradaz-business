import { CART_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  BaseCreateCartInputData,
  CreateCartItemInputData,
  GetAllCartsOutputData,
  GetAllCartsQuerySchema,
  GetCartOutputData,
  UpdateCartInputData,
} from "@/schema/cart";
import { cache } from "@/utilities/cacheKey";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const useCarts = (
  organizationId: string | undefined,
  teamId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllCartsOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllCartsQuerySchema);

  return useSWRInfinite(
    cache.cursorKey(CART_KEY, { ...query, organizationId, teamId }),
    ([key, { organizationId, teamId, ...query }]) =>
      apiClient("@get/api/cart", {
        query,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    config,
  );
};

export const useCart = (
  id: string | undefined,
  organizationId: string | undefined,
  teamId: string | undefined,
  config?: SWRConfiguration<GetCartOutputData, Error>,
) => {
  return useSWR(
    cache.scopedKey(CART_KEY, id),
    ([key, id]) =>
      apiClient("@get/api/cart/:id", {
        params: { id },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    config,
  );
};

export const useAddCart = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(cache.cursorKey(CART_KEY, { organizationId, teamId })),
    (key, { arg }: { arg: BaseCreateCartInputData }) =>
      apiClient("@post/api/cart", {
        body: arg,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
  );
};

export const useUpdateCart = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(CART_KEY, { organizationId, teamId })),
    (key, { arg }: { arg: { id: string; data: UpdateCartInputData } }) =>
      apiClient("@put/api/cart/:id", {
        params: { id: arg.id },
        body: arg.data,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(CART_KEY, data.id)),
    },
  );
};

export const useRemoveCart = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(CART_KEY, { organizationId, teamId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/cart/:id", {
        params: { id: arg },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(CART_KEY, data.id)),
    },
  );
};

export const useAddCartItem = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(CART_KEY, { organizationId, teamId })),
    (key, { arg }: { arg: CreateCartItemInputData }) =>
      apiClient("@post/api/cart/item", {
        body: arg,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(CART_KEY, data.cartId)),
    },
  );
};

export const useIncrementCartItem = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(CART_KEY, { organizationId, teamId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@post/api/cart/item/increment", {
        body: { id: arg },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(CART_KEY, data.cartId)),
    },
  );
};

export const useDecrementCartItem = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(CART_KEY, { organizationId, teamId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@post/api/cart/item/decrement", {
        body: { id: arg },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(CART_KEY, data.cartId)),
    },
  );
};

export const useRemoveCartItem = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(cache.cursorKey(CART_KEY, { organizationId, teamId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/cart/item/:id", {
        params: { id: arg },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(cache.scopedKey(CART_KEY, data.cartId)),
    },
  );
};
