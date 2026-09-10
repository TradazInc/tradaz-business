import { POINTS_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient } from "@/lib/fetchClient";
import {
  CreatePointsConfigInputData,
  GetAllPointsConfigOutputData,
  UpdatePointsConfigInputData,
} from "@/schema/pointsConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const usePointsConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllPointsConfigOutputData, Error>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(POINTS_CONFIG_KEY, query),
    ([key, query]) => apiClient("@get/api/points-config", { query }),
    config,
  );
};

export const useAddPointsConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POINTS_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: CreatePointsConfigInputData }) =>
      apiClient("@post/api/points-config", { body: arg }),
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

export const useUpdatePointsConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POINTS_CONFIG_KEY, organizationId),
    (
      key,
      {
        arg,
      }: { arg: { id: string; pointsConfig: UpdatePointsConfigInputData } },
    ) =>
      apiClient("@put/api/points-config/:id", {
        params: { id: arg.id },
        body: arg.pointsConfig,
      }),
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
