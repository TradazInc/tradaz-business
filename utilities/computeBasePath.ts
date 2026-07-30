import { Params } from "next/dist/server/request/params";

export function computeBasePath({ businessId, storeId }: Params) {
  if (!businessId && !storeId) return "/dashboard";
  if (businessId) return `/dashboard/business/${businessId}`;
  if (storeId) return `/dashboard/store/${storeId}`;
  return "/invalid";
}
