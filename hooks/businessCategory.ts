import { BusinessCategory } from "@/entities/BusinessCategory";
import { ApiClient } from "@/lib/apiClient";
import useSWRInfinite from "swr/infinite";

const businessCategoryService = new ApiClient<BusinessCategory>(
  "/api/business-categories",
);

export const useBusinessCategories = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData?.meta?.next) return null; // reached the end
      if (pageIndex === 0)
        return { key: "business-categories", query: { pageSize } }; // first page, we don't have `previousPageData`
      return {
        key: "business-categories",
        query: { pageSize, cursor: previousPageData?.meta.next },
      };
    },
    ({ query }) => businessCategoryService.getAll({ query }),
  );
};
