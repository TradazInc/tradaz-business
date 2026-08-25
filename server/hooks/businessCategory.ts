import { PAGE_SIZE } from "@/data/constants";
import { BUSINESS_CATEGORY_KEY } from "@/utilities/cacheKeys";
import { cursorQuery } from "@/utilities/pageQuery";
import useSWRInfinite from "swr/infinite";
import { businessCategoryService } from "../entities/businessCategory";

export const useBusinessCategories = () => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return cursor ? [BUSINESS_CATEGORY_KEY, cursor] : null;
    },
    ([key, query]) => businessCategoryService.getAll({ query, throw: true }),
  );
};
