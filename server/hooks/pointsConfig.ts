import { PAGE_SIZE } from "@/data/constants";
import { FetchResponse } from "@/lib/apiClient";
import { cursorKey, POINTS_CONFIG_KEY } from "@/utilities/cacheKeys";
import { extractSearchParams } from "@/utilities/extractSearchParams";
import useSWRInfinite from "swr/infinite";
import { PointsConfig, pointsConfigService } from "../entities/pointsConfig";
import useSWRMutation from "swr/mutation";
import { PointsConfigData } from "@/schema/pointsConfig";

export const usePointsConfigs = (
  fallbackData?: FetchResponse<PointsConfig>[],
) => {
  return useSWRInfinite<FetchResponse<PointsConfig>>(
    (pageIndex, previousPageData) =>
      cursorKey(pageIndex, previousPageData, POINTS_CONFIG_KEY, PAGE_SIZE),
    (url) =>
      pointsConfigService.getAll({
        query: extractSearchParams(url),
        throw: true,
      }),
    { fallbackData },
  );
};

export const useAddPointsConfig = () => {
  const { mutate } = usePointsConfigs();

  return useSWRMutation(
    POINTS_CONFIG_KEY,
    (url: string, { arg }: { arg: PointsConfigData }) =>
      pointsConfigService.post({ body: arg, throw: true }),
    { onSuccess: () => mutate() },
  );
};

export const useRemovePointsConfig = () => {
  const { mutate } = usePointsConfigs();

  return useSWRMutation(
    POINTS_CONFIG_KEY,
    (url: string, { arg }: { arg: string }) =>
      pointsConfigService.delete(arg, { throw: true }),
    { onSuccess: () => mutate() },
  );
};
