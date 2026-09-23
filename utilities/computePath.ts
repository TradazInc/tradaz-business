export function computePath(
  businessId?: string,
  storeId?: string,
):
  | `/dashboard`
  | `/dashboard/business/${string}`
  | `/dashboard/business/${string}/store/${string}` {
  if (!businessId) return "/dashboard";
  if (!storeId) return `/dashboard/business/${businessId}`;
  return `/dashboard/business/${businessId}/store/${storeId}`;
}
