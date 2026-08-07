import { FetchResponse } from "@/server/entities/fetchResponse";

// Constant Keys
export const BUSINESS_KEY = "/api/business"; // used for prefetching in layout

export const SESSION_KEY = "/api/session"; // session is seeded from the layout

export const PRODUCT_KEY = "/api/products";

// Computed Keys
export const businessKey = (businessId: string) =>
  `${BUSINESS_KEY}/${businessId}`;

export const storeKey = (businessId: string) =>
  `${BUSINESS_KEY}/${businessId}/stores`;

export function cursorKey<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  cacheKey: string,
  pageSize: number,
) {
  if (previousPageData && !previousPageData.meta?.next) return null; // reached the end
  if (pageIndex === 0) return { key: cacheKey, query: { pageSize } }; // first page, we don't have `previousPageData`
  return {
    key: cacheKey,
    query: { pageSize, cursor: previousPageData?.meta?.next },
  };
}

export function indexKey<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  cacheKey: string,
  pageSize: number,
) {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return { key: cacheKey, query: { page: pageIndex, pageSize } };
}
