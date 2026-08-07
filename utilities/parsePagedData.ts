import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/server/entities/fetchResponse";

export function parseCursorData<D>(data?: FetchResponse<D>[]) {
  const flatData = data?.flatMap((page) => page.data) ?? [];
  const hasMore = data ? !!data[data.length - 1].meta.next : true;

  return { flatData, hasMore };
}

export function parseIndexData<D>(data?: FetchResponse<D>[]) {
  const flatData = data?.flatMap((page) => page.data) ?? [];
  const hasMore = data ? data[data.length - 1].data.length === PAGE_SIZE : true;

  return { flatData, hasMore };
}
