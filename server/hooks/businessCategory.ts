import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import { BUSINESS_CATEGORY_KEY, cursorKey } from "@/utilities/cacheKeys";
import { extractSearchParams } from "@/utilities/extractSearchParams";
import useSWRInfinite from "swr/infinite";
import {
  BusinessCategory,
  businessCategoryService,
} from "../entities/businessCategory";

export const useBusinessCategories = () => {
  return useSWRInfinite<FetchResponse<BusinessCategory>>(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, BUSINESS_CATEGORY_KEY, PAGE_SIZE),
    (url) =>
      businessCategoryService.getAll({
        query: extractSearchParams(url),
        throw: true,
      }),
  );
};
