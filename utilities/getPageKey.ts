import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import { CursorQuery, cursorQuery, IndexQuery, indexQuery } from "./pageQuery";

type QueryParams = Record<string, string | number | undefined>;

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
