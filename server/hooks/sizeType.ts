import { cursorKey, SIZE_TYPE_KEY } from "@/utilities/cacheKeys";
import useSWRInfinite from "swr/infinite";
import { SizeType, sizeTypeService } from "../entities/sizeType";
import { PAGE_SIZE } from "@/data/constants";
import useSWRMutation from "swr/mutation";
import { SizeTypeData } from "@/schema/sizeType";
import { FetchResponse } from "../entities/fetchResponse";

export const useSizeTypes = (fallbackData?: FetchResponse<SizeType>[]) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "size-types", PAGE_SIZE),
    () => sizeTypeService.getAll({ throw: true }),
    { fallbackData },
  );
};

export const useAddSizeTypes = () => {
  return useSWRMutation(
    SIZE_TYPE_KEY,
    (url: string, { arg }: { arg: SizeTypeData }) =>
      sizeTypeService.post({ body: arg, throw: true }),
  );
};

export const useRemoveSizeType = () => {
  return useSWRMutation(
    SIZE_TYPE_KEY,
    (url: string, { arg }: { arg: string }) =>
      sizeTypeService.delete(arg, { throw: true }),
  );
};
