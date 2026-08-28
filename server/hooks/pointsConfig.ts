import { SWRInfiniteConfig } from "@/lib/apiClient";
import { PointsConfigData } from "@/schema/pointsConfig";
import { POINTS_CONFIG_KEY } from "@/data/cacheKeys";
import { getCursorKey } from "@/utilities/getPageKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { PointsConfig, pointsConfigService } from "../entities/pointsConfig";

export const usePointsConfigs = (
  organizationId?: string,
  config?: SWRInfiniteConfig<PointsConfig>,
) => {
  return useSWRInfinite(
    getCursorKey(POINTS_CONFIG_KEY, { organizationId }),
    ([key, query]) => pointsConfigService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddPointsConfig = (organizationId?: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    organizationId ? [POINTS_CONFIG_KEY, organizationId] : null,
    (key, { arg }: { arg: PointsConfigData }) =>
      pointsConfigService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(POINTS_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};

export const useRemovePointsConfig = (organizationId?: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    organizationId ? [POINTS_CONFIG_KEY, organizationId] : null,
    (key, { arg }: { arg: string }) =>
      pointsConfigService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(POINTS_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};
