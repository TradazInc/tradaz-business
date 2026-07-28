import { BusinessCategory } from "@/entities/BusinessCategory";
import { ApiClient, FetchResponse } from "@/lib/apiClient";
import { getKey } from "@/utilities/getKey";
import useSWRInfinite from "swr/infinite";

const businessCategoryService = new ApiClient<BusinessCategory>(
  "/api/business-categories",
);

export const useBusinessCategories = () => {
  const pageSize = 20;

  return useSWRInfinite<FetchResponse<BusinessCategory>>(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, "business-categories", pageSize),
    ({ query }) => businessCategoryService.getAll({ query }),
  );
};
