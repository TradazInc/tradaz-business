import { POINTS_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreatePointsConfigInputData,
  GetAllPointsConfigOutputData,
  GetAllPointsConfigQuerySchema,
  UpdatePointsConfigInputData,
} from "@/schema/pointsConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const usePointsConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllPointsConfigOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllPointsConfigQuerySchema);

  return useSWRInfinite(
    getCursorKey(POINTS_CONFIG_KEY, { ...query, organizationId }),
    ([key, query]) =>
      apiClient("@get/api/points-config", { query, ...apiConfig }),
    config,
  );
};

export const useAddPointsConfig = (organizationId: string | undefined) => {
  return useSWRMutation(
    unstable_serialize(getCursorKey(POINTS_CONFIG_KEY, { organizationId })),
    (key, { arg }: { arg: CreatePointsConfigInputData }) =>
      apiClient("@post/api/points-config", { body: arg, ...apiConfig }),
  );
};

export const useUpdatePointsConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(POINTS_CONFIG_KEY, { organizationId })),
    (
      key,
      { arg }: { arg: { id: string; data: UpdatePointsConfigInputData } },
    ) =>
      apiClient("@put/api/points-config/:id", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(POINTS_CONFIG_KEY, data.id)),
    },
  );
};
