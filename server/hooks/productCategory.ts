import { cursorKey } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import { productCategoryService } from "../entities/productCategory";

export const useProductCategories = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "product-categories", pageSize),
    () => productCategoryService.getAll({ throw: true }),
  );
};
