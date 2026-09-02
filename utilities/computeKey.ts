import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import {
  CursorQuery,
  cursorQuery,
  IndexQuery,
  indexQuery,
  isQueryValid,
  SearchQuery,
} from "./paginationQuery";

// Computed Cache Keys
export const getKey = (cacheKey: string): [string] => [cacheKey];

export const getScopedKey = (
  cacheKey: string,
  scope: string | undefined,
): [string, string] | null => (scope ? [cacheKey, scope] : null);

// Pagination Cache Keys
export function getCursorKey(cacheKey: string, query: SearchQuery) {
  return <T>(
    pageIndex: number,
    previousPageData: FetchResponse<T> | null,
  ): [string, SearchQuery & CursorQuery] | null => {
    const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);

    return cursor && isQueryValid(query)
      ? [cacheKey, { ...query, ...cursor }]
      : null;
  };
}

export function getIndexKey(cacheKey: string, query: SearchQuery) {
  return <T>(
    pageIndex: number,
    previousPageData: FetchResponse<T> | null,
  ): [string, SearchQuery & IndexQuery] | null => {
    const index = indexQuery(pageIndex, previousPageData, PAGE_SIZE);

    return index && isQueryValid(query)
      ? [cacheKey, { ...query, ...index }]
      : null;
  };
}
