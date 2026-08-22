import { pointsConfigService } from "../entities/pointsConfig";

export async function getPointsConfigs() {
  return pointsConfigService.getAll();
}
