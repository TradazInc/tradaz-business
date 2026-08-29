import { ApiClient } from "@/lib/apiClient";

export interface PointsConfig {
  id: string;
  createdAt: string;
  organizationId: string;
  name: string;
  minOrderValue: number;
  maxOrderValue: number;
  rewardPercentage: number;
}

export const pointsConfigService = new ApiClient<PointsConfig>(
  "/api/points-config",
);
