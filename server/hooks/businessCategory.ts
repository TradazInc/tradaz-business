import { FetchResponse } from "@/lib/apiClient";
import { getKey } from "@/utilities/getKey";
import useSWRInfinite from "swr/infinite";
import {
  BusinessCategory,
  businessCategoryService,
} from "../entities/businessCategory";

export const useBusinessCategories = () => {
  const pageSize = 20;

  return useSWRInfinite<FetchResponse<BusinessCategory>>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, "business-categories", pageSize),
    ({ query }) => businessCategoryService.getAll({ query }),
  );
};
