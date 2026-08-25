import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";

export function parseCursorData<D>(data?: FetchResponse<D>[]) {
  const flatData = data?.flatMap((page) => page.data) ?? [];
  const lastPage = data?.at(-1);
  const hasMore = lastPage ? !!lastPage.meta?.next : true;

  return { flatData, hasMore };
}

export function parseIndexData<D>(data?: FetchResponse<D>[]) {
  const flatData = data?.flatMap((page) => page.data) ?? [];
  const lastPage = data?.at(-1);
  const hasMore = lastPage ? lastPage.data.length === PAGE_SIZE : true;

  return { flatData, hasMore };
}
