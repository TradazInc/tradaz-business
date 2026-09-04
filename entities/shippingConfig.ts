import { ApiClient } from "@/lib/apiClient";

export interface ShippingConfig {
  id: string;
  carrier: string;
  createdAt: string;
  organizationId: string;
  shippingMethods: ShippingMethod[];
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  deliveryDaysMin: number;
  deliveryDaysMax: number;
  createdAt: string;
  shippingConfigId: string;
}

export const shippingConfigService = new ApiClient<ShippingConfig>(
  "/api/shipping-configs",
);
