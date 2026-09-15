import { POINTS_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreatePointsConfigInputData,
  GetAllPointsConfigOutputData,
  GetAllPointsConfigQuerySchema,
  UpdatePointsConfigInputData,
} from "@/schema/pointsConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
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
  const query = {
    organizationId,
    ...GetAllPointsConfigQuerySchema.parse(searchParams),
  };

  return useSWRInfinite(
    getCursorKey(POINTS_CONFIG_KEY, query),
    ([key, query]) =>
      apiClient("@get/api/points-config", { query, ...apiConfig }),
    config,
  );
};

export const useAddPointsConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POINTS_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: CreatePointsConfigInputData }) =>
      apiClient("@post/api/points-config", { body: arg, ...apiConfig }),
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

export const useUpdatePointsConfig = (
  id: string,
  organizationId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POINTS_CONFIG_KEY, id),
    (key, { arg }: { arg: UpdatePointsConfigInputData }) =>
      apiClient("@put/api/points-config/:id", {
        params: { id },
        body: arg,
        ...apiConfig,
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
