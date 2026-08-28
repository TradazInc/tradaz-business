import { SWRInfiniteConfig } from "@/lib/apiClient";
import { PointsConfigData } from "@/schema/pointsConfig";
import { POINTS_CONFIG_KEY } from "@/data/cacheKeys";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { PointsConfig, pointsConfigService } from "../entities/pointsConfig";

export const usePointsConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<PointsConfig>,
) => {
  return useSWRInfinite(
    getCursorKey(POINTS_CONFIG_KEY, { organizationId }),
    ([key, query]) => pointsConfigService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddPointsConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POINTS_CONFIG_KEY, organizationId),
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

export const useRemovePointsConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POINTS_CONFIG_KEY, organizationId),
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
