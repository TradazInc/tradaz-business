export function computePath(businessId?: string, storeId?: string) {
  if (!businessId) return "/dashboard";
  if (!storeId) return `/dashboard/business/${businessId}`;
  return `/dashboard/business/${businessId}/store/${storeId}`;
}
