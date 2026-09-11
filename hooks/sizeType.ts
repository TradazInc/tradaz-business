import { SIZE_TYPE_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateSizeTypeInputData,
  GetAllSizeTypeOutputData,
} from "@/schema/sizeType";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useSizeTypes = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllSizeTypeOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(SIZE_TYPE_KEY, query),
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
