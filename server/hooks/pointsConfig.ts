import { PAGE_SIZE } from "@/data/constants";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { PointsConfigData } from "@/schema/pointsConfig";
import { POINTS_CONFIG_KEY } from "@/utilities/cacheKeys";
import { cursorQuery } from "@/utilities/pageQuery";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { PointsConfig, pointsConfigService } from "../entities/pointsConfig";

export const usePointsConfigs = (
  organizationId?: string,
  config?: SWRInfiniteConfig<PointsConfig>,
) => {
  return useSWRInfinite(
    (pageIndex, previousPageData) => {
      const cursor = cursorQuery(pageIndex, previousPageData, PAGE_SIZE);
      return organizationId && cursor
        ? [POINTS_CONFIG_KEY, { organizationId, ...cursor }]
        : null;
    },
    ([key, query]) => pointsConfigService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddPointsConfig = (organizationId?: string) => {
  const { mutate } = usePointsConfigs(organizationId, {
    revalidateOnMount: false,
  });

  return useSWRMutation(
    organizationId ? [POINTS_CONFIG_KEY, organizationId] : null,
    (key, { arg }: { arg: PointsConfigData }) =>
      pointsConfigService.post({ body: arg, throw: true }),
    { onSuccess: () => mutate() },
  );
};

export const useRemovePointsConfig = (organizationId?: string) => {
  const { mutate } = usePointsConfigs(organizationId, {
    revalidateOnMount: false,
  });

  return useSWRMutation(
    organizationId ? [POINTS_CONFIG_KEY, organizationId] : null,
    (key, { arg }: { arg: string }) =>
      pointsConfigService.delete(arg, { throw: true }),
    { onSuccess: () => mutate() },
  );
};
