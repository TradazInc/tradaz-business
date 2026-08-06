import { pagedKey } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import { sizeTypeService } from "../entities/sizeType";

export const useSizeTypes = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      pagedKey(pageIndex, previousPageData, "size-types", pageSize),
    () => sizeTypeService.getAll(),
  );
};
