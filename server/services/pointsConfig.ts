import { PAGE_SIZE } from "@/data/constants";
import { pointsConfigService } from "../entities/pointsConfig";

export async function getPointsConfigs(organizationId?: string) {
  return pointsConfigService.getAll({
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
