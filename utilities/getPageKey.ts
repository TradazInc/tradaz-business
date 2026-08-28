import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";

type CursorQuery = { cursor?: string; pageSize: number };
type IndexQuery = { page: number; pageSize: number };
type QueryParams = Record<string, string | number | undefined>;

// Pagination Queries
function cursorQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
): CursorQuery | null {
  if (previousPageData && !previousPageData.data) return null; // reached the end
  if (pageIndex === 0) return { pageSize }; // first page, no `previousPageData`
  return { cursor: previousPageData?.meta?.next, pageSize };
}

function indexQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
): IndexQuery | null {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return { page: pageIndex, pageSize };
}

// Pagination Cache Keys
export function getCursorKey(cacheKey: string, params?: QueryParams) {
  return <T>(
    pageIndex: number,
    previousPageData: FetchResponse<T> | null,
  ): [string, (QueryParams & CursorQuery)?] | null => {
    const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
    return cursor ? [cacheKey, { ...params, ...cursor }] : null;
  };
}

export function getIndexKey(cacheKey: string, params?: QueryParams) {
  return <T>(
    pageIndex: number,
    previousPageData: FetchResponse<T> | null,
  ): [string, (QueryParams & IndexQuery)?] | null => {
    const index = indexQuery(pageIndex, previousPageData, PAGE_SIZE);
    return index ? [cacheKey, { ...params, ...index }] : null;
  };
}
