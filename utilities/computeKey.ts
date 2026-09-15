import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/schema/fetchResponse";
import {
  CursorQuery,
  cursorQuery,
  IndexQuery,
  indexQuery,
} from "./paginationQuery";

// Computed Cache Keys
export const getKey = (cacheKey: string): [string] => [cacheKey];

export const getScopedKey = (
  cacheKey: string,
  scope: string | undefined,
): [string, string] | null => (scope ? [cacheKey, scope] : null);

// Pagination Cache Keys
export function getCursorKey<K>(cacheKey: string, query: K) {
  return <T>(
    pageIndex: number,
    previousPageData: FetchResponse<T> | null,
  ): [string, K & CursorQuery] | null => {
    const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);

    return cursor ? [cacheKey, { ...query, ...cursor }] : null;
  };
}

export function getIndexKey<K>(cacheKey: string, query: K) {
  return <T>(
    pageIndex: number,
    previousPageData: FetchResponse<T> | null,
  ): [string, K & IndexQuery] | null => {
    const index = indexQuery(pageIndex, previousPageData, PAGE_SIZE);

    return index ? [cacheKey, { ...query, ...index }] : null;
  };
}
