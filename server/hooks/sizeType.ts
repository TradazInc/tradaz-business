import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import { SizeTypeData } from "@/schema/sizeType";
import { SIZE_TYPE_KEY } from "@/utilities/cacheKeys";
import { cursorQuery } from "@/utilities/pageQuery";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { SizeType, sizeTypeService } from "../entities/sizeType";

export const useSizeTypes = (
  organizationId?: string,
  fallbackData?: FetchResponse<SizeType>[],
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return organizationId && cursor
        ? [SIZE_TYPE_KEY, { organizationId, ...cursor }]
        : null;
    },
    ([key, query]) => sizeTypeService.getAll({ query, throw: true }),
    { fallbackData },
  );
};

export const useAddSizeTypes = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? [SIZE_TYPE_KEY, organizationId] : null,
    (key, { arg }: { arg: SizeTypeData }) =>
      sizeTypeService.post({ body: arg, throw: true }),
  );
};

export const useRemoveSizeType = (organizationId?: string) => {
  return useSWRMutation(
    organizationId ? [SIZE_TYPE_KEY, organizationId] : null,
    (key, { arg }: { arg: string }) =>
      sizeTypeService.delete(arg, { throw: true }),
  );
};
