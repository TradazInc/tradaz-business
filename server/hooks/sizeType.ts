import { pageKey } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import { sizeTypeService } from "../entities/sizeType";

export const useSizeTypes = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      pageKey(pageIndex, previousPageData, "size-types", pageSize),
    () => sizeTypeService.getAll({ throw: true }),
  );
};
