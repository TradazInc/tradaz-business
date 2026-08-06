import { FetchResponse } from "@/server/entities/fetchResponse";

// Constant Keys
export const BUSINESS_KEY = "/api/business"; // used for prefetching in layout

export const SESSION_KEY = "/api/session"; // session is seeded from the layout

export const PRODUCT_KEY = "/api/products";

// Derived Keys
export const businessKey = (businessId: string) =>
  `${BUSINESS_KEY}/${businessId}`;

export const storeKey = (businessId: string) =>
  `${BUSINESS_KEY}/${businessId}/stores`;

export function pageKey<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  cacheKey: string,
  pageSize: number,
) {
  // reached the end
  if (previousPageData && !previousPageData.meta?.next) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0)
    return {
      key: cacheKey,
      query: { pageSize },
    };
  return {
    key: cacheKey,
    query: { pageSize, cursor: previousPageData?.meta?.next },
  };
}
