import { cursorKey } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import { sizeTypeService } from "../entities/sizeType";
import { PAGE_SIZE } from "@/data/constants";

export const useSizeTypes = () => {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "size-types", PAGE_SIZE),
    () => sizeTypeService.getAll({ throw: true }),
  );
};
