import { FetchResponse } from "@/server/entities/fetchResponse";

export function pagedKey<T>(
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
export const ORGANIZATIONS_KEY = "/api/organizations"; // used for prefetching in layout

export const SESSION_KEY = "/api/session"; // session is seeded from the layout

export const businessKey = (businessId: string) =>
  `${ORGANIZATIONS_KEY}/${businessId}`;

export const storesKey = (businessId: string) =>
  `${ORGANIZATIONS_KEY}/${businessId}/stores`;
