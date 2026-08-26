import { FetchResponse } from "@/lib/apiClient";

export function cursorQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
): { cursor?: string; pageSize: number } | null {
  if (previousPageData && !previousPageData.data) return null; // reached the end
  if (pageIndex === 0) return { pageSize }; // first page, no `previousPageData`
  return { cursor: previousPageData?.meta?.next, pageSize };
}

export function indexQuery<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  pageSize: number,
) {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return { page: pageIndex, pageSize };
}
