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

export function computePortalPath(
  businessId?: string,
  storeId?: string,
):
  | `/portal`
  | `/portal/business/${string}`
  | `/portal/business/${string}/store/${string}` {
  if (!businessId) return "/portal";
  if (!storeId) return `/portal/business/${businessId}`;
  return `/portal/business/${businessId}/store/${storeId}`;
}
