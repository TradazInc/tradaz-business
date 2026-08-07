import { FetchResponse } from "@/server/entities/fetchResponse";
import { cursorKey } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import {
  BusinessCategory,
  businessCategoryService,
} from "../entities/businessCategory";

export const useBusinessCategories = () => {
  const pageSize = 20;

  return useSWRInfinite<FetchResponse<BusinessCategory>>(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "business-categories", pageSize),
    ({ query }) => businessCategoryService.getAll({ query, throw: true }),
  );
};
