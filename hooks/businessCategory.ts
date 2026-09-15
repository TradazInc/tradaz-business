import { BUSINESS_CATEGORY_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreateBusinessCategoryInputData,
  GetAllBusinessCategoryOutputData,
  GetAllBusinessCategoryQuerySchema,
} from "@/schema/businessCategory";
import { getCursorKey, getKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const useBusinessCategories = (
  config?: SWRInfiniteConfiguration<GetAllBusinessCategoryOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllBusinessCategoryQuerySchema);

  return useSWRInfinite(
    getCursorKey(BUSINESS_CATEGORY_KEY, query),
    ([key, query]) =>
      apiClient("@get/api/business-categories", {
        query,
        ...apiConfig,
      }),
    config,
  );
};

export const useAddBusinessCategory = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getKey(BUSINESS_CATEGORY_KEY),
    (key, { arg }: { arg: CreateBusinessCategoryInputData }) =>
      apiClient("@post/api/business-categories", {
        body: arg,
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getCursorKey(BUSINESS_CATEGORY_KEY, {}))),
    },
  );
};

export const useRemoveBusinessCategory = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getKey(BUSINESS_CATEGORY_KEY),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/business-categories/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getCursorKey(BUSINESS_CATEGORY_KEY, {}))),
    },
  );
};
