import { APPROVED_PRODUCT_KEY, PRODUCT_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import {
  CreateProductInputData,
  GetAllProductOutputData,
  GetAllProductQuerySchema,
  GetProductOutputData,
  GetApprovedProductOutputData,
  GetApprovedProductQueryData,
  UpdateProductInputData,
  UpdateProductStatusInputData,
} from "@/schema/product";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const useProducts = (
  organizationId: string | undefined,
  teamId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllProductOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllProductQuerySchema);

  return useSWRInfinite(
    getCursorKey(PRODUCT_KEY, { ...query, organizationId, teamId }),
    ([key, query]) => apiClient("@get/api/products", { query, ...apiConfig }),
    config,
  );
};

// Public: approved products only, optionally scoped to a business by id or slug
export const useApprovedProduct = (
  id: string | undefined,
  query: GetApprovedProductQueryData = {},
  config?: SWRConfiguration<GetApprovedProductOutputData, Error>,
) => {
  return useSWR(
    getScopedKey(APPROVED_PRODUCT_KEY, id),
    ([key, id]) =>
      apiClient("@get/api/products/:id/approved", {
        params: { id },
        query,
        ...apiConfig,
      }),
    config,
  );
};

// Business members: any status, with store and vendor details
export const useProduct = (
  id: string | undefined,
  organizationId: string | undefined,
  config?: SWRConfiguration<GetProductOutputData, Error>,
) => {
  return useSWR(
    getScopedKey(PRODUCT_KEY, id),
    ([key, id]) =>
      apiClient("@get/api/products/:id", {
        params: { id },
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    config,
  );
};

export const useAddProduct = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: CreateProductInputData }) =>
      apiClient("@post/api/products", {
        body: arg,
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
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
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(PRODUCT_KEY, data.id)),
    },
  );
};

export const useUpdateProductStatus = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (
      key,
      { arg }: { arg: { id: string; data: UpdateProductStatusInputData } },
    ) =>
      apiClient("@patch/api/products/:id/status", {
        params: { id: arg.id },
        body: arg.data,
        headers: scopeHeaders(organizationId),
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
        headers: scopeHeaders(organizationId),
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
        headers: scopeHeaders(organizationId),
        ...apiConfig,
      }),
  );
};

export const useRemoveStoreVariation = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(PRODUCT_KEY, { organizationId })),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/products/team-variations/:id", {
        params: { id: arg },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
  );
};
