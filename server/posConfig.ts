import { PAGE_SIZE } from "@/data/constants";
import { posConfigService } from "@/entities/posConfig";

export async function getPosConfigs(organizationId?: string) {
  return posConfigService.getAll({
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
