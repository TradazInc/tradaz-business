import { PAGE_SIZE } from "@/data/constants";
import { cursorKey } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import { productCategoryService } from "../entities/productCategory";

export const useProductCategories = () => {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "product-categories", PAGE_SIZE),
    () => productCategoryService.getAll({ throw: true }),
  );
};
