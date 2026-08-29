import { SWRInfiniteConfig } from "@/lib/apiClient";
import { BUSINESS_CATEGORY_KEY } from "@/data/cacheKeys";
import { getCursorKey } from "@/utilities/computeKey";
import useSWRInfinite from "swr/infinite";
import {
  BusinessCategory,
  businessCategoryService,
} from "../entities/businessCategory";

export const useBusinessCategories = (
  config?: SWRInfiniteConfig<BusinessCategory>,
) => {
  return useSWRInfinite(
    getCursorKey(BUSINESS_CATEGORY_KEY, {}),
    ([key, query]) => businessCategoryService.getAll({ query, throw: true }),
    config,
  );
};
