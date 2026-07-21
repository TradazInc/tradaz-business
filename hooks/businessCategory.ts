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
      if (previousPageData && !previousPageData.data) return null;
      if (pageIndex === 0) return `/business-categories?pageSize=${pageSize}`;
      return `/business-categories?cursor=${previousPageData?.meta.next}&pageSize=${pageSize}`;
    },
    () => businessCategoryService.getAll(),
  );
};
