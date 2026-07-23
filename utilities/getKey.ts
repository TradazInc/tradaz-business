import { FetchResponse } from "@/entities/FetchResponse";

export function getKey<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  cacheKey: string,
  pageSize: number,
) {
  // reached the end
  if (previousPageData && !previousPageData.meta?.next) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0)
    return {
      key: cacheKey,
      query: { pageSize },
    };
  return {
    key: cacheKey,
    query: { pageSize, cursor: previousPageData?.meta?.next },
  };
}
