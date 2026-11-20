export type AppBase = "merchant" | "staff";

export function computePath<B extends AppBase>(
  base: B,
  businessId?: string,
  storeId?: string,
):
  | `/${B}`
  | `/${B}/business/${string}`
  | `/${B}/business/${string}/store/${string}` {
  if (!businessId) return `/${base}`;
  if (!storeId) return `/${base}/business/${businessId}`;
  return `/${base}/business/${businessId}/store/${storeId}`;
}
