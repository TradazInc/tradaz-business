import { PAGE_SIZE } from "@/data/constants";
import { uiConfigService } from "@/entities/uiConfig";

export async function getUIConfigs(organizationId?: string) {
  return uiConfigService.getAll({
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
