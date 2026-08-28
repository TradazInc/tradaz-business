import { FetchResponse } from "@/lib/apiClient";

export type CursorQuery = { cursor?: string; pageSize: number };
export type IndexQuery = { page: number; pageSize: number };

export function cursorQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
): CursorQuery | null {
  if (previousPageData && !previousPageData.data) return null; // reached the end
  if (pageIndex === 0) return { pageSize }; // first page, no `previousPageData`
  return { cursor: previousPageData?.meta?.next, pageSize };
}

export function indexQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
): IndexQuery | null {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return { page: pageIndex, pageSize };
}
