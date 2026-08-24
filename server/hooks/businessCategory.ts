import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import { BUSINESS_CATEGORY_KEY } from "@/utilities/cacheKeys";
import { cursorQuery } from "@/utilities/pageQuery";
import useSWRInfinite from "swr/infinite";
import {
  BusinessCategory,
  businessCategoryService,
} from "../entities/businessCategory";

export const useBusinessCategories = () => {
  return useSWRInfinite<FetchResponse<BusinessCategory>>(
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return cursor ? [BUSINESS_CATEGORY_KEY, cursor] : null;
    },
    ([key, query]) => businessCategoryService.getAll({ query, throw: true }),
  );
};
