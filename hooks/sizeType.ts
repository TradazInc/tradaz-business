import { SizeType } from "@/entities/SizeType";
import { ApiClient } from "@/lib/apiClient";
import { getKey } from "@/utilities/getKey";
import useSWRInfinite from "swr/infinite";

const sizeTypeService = new ApiClient<SizeType>("/api/size-types");

export const useSizeTypes = () => {
  const pageSize = 20;

  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      getKey(pageIndex, previousPageData, "size-types", pageSize),
    () => sizeTypeService.getAll(),
  );
};
