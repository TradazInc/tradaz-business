import { FetchResponse } from "@/lib/apiClient";

// Constant Keys
export const BUSINESS_KEY = "/api/business"; // used for prefetching in layout

export const SESSION_KEY = "/api/session"; // session is seeded from the layout

export const PRODUCT_KEY = "/api/products";

export const PRODUCT_CATEGORY_KEY = "/api/product-categories";

export const SIZE_TYPE_KEY = "/api/size-types";

// Computed Keys
export const businessKey = (businessId: string) =>
  `${BUSINESS_KEY}/${businessId}`;

export const storeKey = (businessId: string) =>
  `${BUSINESS_KEY}/${businessId}/stores`;

export function cursorKey<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  resource: string,
  pageSize: number,
) {
  if (previousPageData && !previousPageData.meta?.next) return null; // reached the end
  if (pageIndex === 0) return `/api/${resource}?&pageSize=${pageSize}`; // first page, we don't have `previousPageData`
  return `/api/${resource}?cursor=${previousPageData?.meta?.next}&pageSize=${pageSize}`;
}

export function indexKey<T>(
  pageIndex: number,
  previousPageData: FetchResponse<T> | null,
  resource: string,
  pageSize: number,
) {
  if (previousPageData && !previousPageData.data.length) return null; // reached the end
  return `/api/${resource}?page=${pageIndex}&pageSize=${pageSize}`;
}
