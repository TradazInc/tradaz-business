import { BUSINESS_CATEGORY_KEY } from "@/data/cacheKeys";
import {
  BusinessCategory,
  businessCategoryService,
} from "@/entities/businessCategory";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { getCursorKey } from "@/utilities/computeKey";
import useSWRInfinite from "swr/infinite";

export const useBusinessCategories = (
  config?: SWRInfiniteConfig<BusinessCategory>,
) => {
  return useSWRInfinite(
    getCursorKey(BUSINESS_CATEGORY_KEY, {}),
    ([key, query]) => businessCategoryService.getAll({ query, throw: true }),
    config,
  );
};
