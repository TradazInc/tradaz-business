import { pageSize } from "@/data/pageSize";
import { BusinessCategory } from "@/entities/BusinessCategory";
import { ApiClient } from "@/lib/apiClient";
import useSWRInfinite from "swr/infinite";

const businessCategoryService = new ApiClient<BusinessCategory>(
  "/api/business-categories",
);

export const useBusinessCategories = () => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData?.meta.next) return null; // reached the end
      if (pageIndex === 0) return { pageSize }; // first page, we don't have `previousPageData`
      return { pageSize, cursor: previousPageData?.meta.next }; // add the cursor to the API endpoint
    },
    (query) => businessCategoryService.getAll({ query }),
  );
};
