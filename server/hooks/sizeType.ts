import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import { SizeTypeData } from "@/schema/sizeType";
import { cursorKey, SIZE_TYPE_KEY } from "@/utilities/cacheKeys";
import { extractSearchParams } from "@/utilities/extractSearchParams";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { SizeType, sizeTypeService } from "../entities/sizeType";

export const useSizeTypes = (fallbackData?: FetchResponse<SizeType>[]) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, "size-types", PAGE_SIZE),
    (url) =>
      sizeTypeService.getAll({ query: extractSearchParams(url), throw: true }),
    { fallbackData },
  );
};

export const useAddSizeTypes = () => {
  const { mutate } = useSizeTypes();

  return useSWRMutation(
    SIZE_TYPE_KEY,
    (url: string, { arg }: { arg: SizeTypeData }) =>
      sizeTypeService.post({ body: arg, throw: true }),
    { onSuccess: () => mutate() },
  );
};

export const useRemoveSizeType = () => {
  const { mutate } = useSizeTypes();

  return useSWRMutation(
    SIZE_TYPE_KEY,
    (url: string, { arg }: { arg: string }) =>
      sizeTypeService.delete(arg, { throw: true }),
    { onSuccess: () => mutate() },
  );
};
