import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/utilities/fetchResponse";
import { SWRInfiniteKeyLoader } from "swr/infinite";
import {
  CursorQuery,
  cursorQuery,
  IndexQuery,
  indexQuery,
} from "./paginationQuery";

// Computed Cache Keys (scoped and unscoped)
export const getKey = (cacheKey: string): [string] => [cacheKey];

export const getScopedKey = (
  cacheKey: string,
  scope: string | undefined,
): [string, string] | null => (scope ? [cacheKey, scope] : null);

// Pagination Cache Keys (combine pagination and search query)
export function getCursorKey<K, T>(
  cacheKey: string,
  query: K,
): SWRInfiniteKeyLoader<
  FetchResponse<T> | null,
  [string, K & CursorQuery] | null
> {
  return <T>(pageIndex: number, previousPageData: FetchResponse<T> | null) => {
    const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);

    return cursor ? [cacheKey, { ...query, ...cursor }] : null;
  };
}

export function getIndexKey<K, T>(
  cacheKey: string,
  query: K,
): SWRInfiniteKeyLoader<
  FetchResponse<T> | null,
  [string, K & IndexQuery] | null
> {
  return <T>(pageIndex: number, previousPageData: FetchResponse<T> | null) => {
    const index = indexQuery(pageIndex, previousPageData, PAGE_SIZE);

    return index ? [cacheKey, { ...query, ...index }] : null;
  };
}
