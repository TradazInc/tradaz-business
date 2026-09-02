import { BUSINESS_CATEGORY_KEY } from "@/data/cacheKeys";
import {
  BusinessCategory,
  businessCategoryService,
} from "@/entities/businessCategory";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { BusinessCategoryData } from "@/schema/businessCategory";
import { getCursorKey, getKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useBusinessCategories = (
  config?: SWRInfiniteConfig<BusinessCategory>,
) => {
  return useSWRInfinite(
    getCursorKey(BUSINESS_CATEGORY_KEY, {}),
    ([key, query]) => businessCategoryService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddBusinessCategory = () => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getKey(BUSINESS_CATEGORY_KEY),
    (key, { arg }: { arg: BusinessCategoryData }) =>
      businessCategoryService.post({ body: arg, throw: true }),
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
      businessCategoryService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(unstable_serialize(getCursorKey(BUSINESS_CATEGORY_KEY, {}))),
    },
  );
};
