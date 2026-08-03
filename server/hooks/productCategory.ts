import { getKey } from "@/utilities/getKey";
import useSWRInfinite from "swr/infinite";
import { productCategoryService } from "../entities/productCategory";

export const useProductCategories = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, "product-categories", pageSize),
    () => productCategoryService.getAll(),
  );
};
