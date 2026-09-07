import { PAGE_SIZE } from "@/data/constants";
import { shippingConfigService } from "@/entities/shippingConfig";

export async function getShippingConfigs(organizationId?: string) {
  return shippingConfigService.getAll({
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
