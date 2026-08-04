import { getCacheKey } from "@/utilities/getCacheKey";
import useSWRInfinite from "swr/infinite";
import { sizeTypeService } from "../entities/sizeType";

export const useSizeTypes = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      getCacheKey(pageIndex, previousPageData, "size-types", pageSize),
    () => sizeTypeService.getAll(),
  );
};
