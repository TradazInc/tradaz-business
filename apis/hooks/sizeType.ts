import { getKey } from "@/utilities/getKey";
import useSWRInfinite from "swr/infinite";
import { sizeTypeService } from "../services/sizeType";

export const useSizeTypes = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, "size-types", pageSize),
    () => sizeTypeService.getAll(),
  );
};
