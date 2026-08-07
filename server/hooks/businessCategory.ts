import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/server/entities/fetchResponse";
import { cursorKey } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import {
  BusinessCategory,
  businessCategoryService,
} from "../entities/businessCategory";

export const useBusinessCategories = () => {
  return useSWRInfinite<FetchResponse<BusinessCategory>>(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "business-categories", PAGE_SIZE),
    ({ query }) => businessCategoryService.getAll({ query, throw: true }),
  );
};
