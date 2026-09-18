import { SIZE_TYPE_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateSizeTypeInputData,
  GetAllSizeTypeOutputData,
  GetAllSizeTypeQuerySchema,
  UpdateSizeTypeInputData,
} from "@/schema/sizeType";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useSizeTypes = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllSizeTypeOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllSizeTypeQuerySchema);

  return useSWRInfinite(
    getCursorKey(SIZE_TYPE_KEY, { ...query, organizationId }),
    ([key, query]) => apiClient("@get/api/size-types", { query, ...apiConfig }),
    config,
  );
};

export const useAddSizeTypes = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SIZE_TYPE_KEY, organizationId),
    (key, { arg }: { arg: CreateSizeTypeInputData }) =>
      apiClient("@post/api/size-types", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SIZE_TYPE_KEY, { organizationId })),
        ),
    },
  );
};

export const useUpdateSizeType = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(SIZE_TYPE_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdateSizeTypeInputData } }) =>
      apiClient("@put/api/size-types/:id", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(SIZE_TYPE_KEY, data.id)),
    },
  );
};

export const useRemoveSizeType = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SIZE_TYPE_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/size-types/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SIZE_TYPE_KEY, { organizationId })),
        ),
    },
  );
};

export const useRemoveSize = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SIZE_TYPE_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/size-types/sizes/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SIZE_TYPE_KEY, { organizationId })),
        ),
    },
  );
};
