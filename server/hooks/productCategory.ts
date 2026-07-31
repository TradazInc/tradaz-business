import { getKey } from "@/utilities/getKey";
import useSWRInfinite from "swr/infinite";
import { productCategoryService } from "../services/productCategories";

export const useProductCategories = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, "product-categories", pageSize),
    () => productCategoryService.getAll(),
  );
};
