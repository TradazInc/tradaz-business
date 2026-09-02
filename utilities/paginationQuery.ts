import { FetchResponse } from "@/lib/apiClient";

export type CursorQuery = { cursor?: string; pageSize: number };
export type IndexQuery = { page: number; pageSize: number };

// Pagination Queries
export function cursorQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
): CursorQuery | null {
  if (previousPageData && !previousPageData.meta?.next) return null; // reached the end
  if (pageIndex === 0) return { pageSize }; // first page, we don't have `previousPageData`
  return { cursor: previousPageData?.meta?.next, pageSize }; // add the cursor to the API endpoint
}

export function indexQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
): IndexQuery | null {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return { page: pageIndex, pageSize };
}
