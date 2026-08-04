import { getCacheKey } from "@/utilities/getCacheKey";
import useSWRInfinite from "swr/infinite";
import { productCategoryService } from "../entities/productCategory";

export const useProductCategories = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      getCacheKey(pageIndex, previousPageData, "product-categories", pageSize),
    () => productCategoryService.getAll(),
  );
};
