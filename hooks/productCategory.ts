import { ProductCategory } from "@/entities/ProductCategory";
import { ApiClient } from "@/lib/apiClient";
import { getKey } from "@/utilities/getKey";
import useSWRInfinite from "swr/infinite";

const productCategoryService = new ApiClient<ProductCategory>(
  "/api/product-categories",
);

export const useProductCategories = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, "product-categories", pageSize),
    () => productCategoryService.getAll(),
  );
};
