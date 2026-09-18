import { POS_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreatePosConfigInputData,
  GetAllPosConfigOutputData,
  GetAllPosConfigQuerySchema,
  UpdatePosConfigInputData,
} from "@/schema/posConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./useSearchQuery";

export const usePosConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllPosConfigOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllPosConfigQuerySchema);

  return useSWRInfinite(
    getCursorKey(POS_CONFIG_KEY, { ...query, organizationId }),
    ([key, query]) =>
      apiClient("@get/api/pos-configs", { query, ...apiConfig }),
    config,
  );
};

export const useAddPosConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POS_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: CreatePosConfigInputData }) =>
      apiClient("@post/api/pos-configs", { body: arg, ...apiConfig }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(POS_CONFIG_KEY, { organizationId })),
        ),
    },
  );
};

export const useUpdatePosConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(getCursorKey(POS_CONFIG_KEY, { organizationId })),
    (key, { arg }: { arg: { id: string; data: UpdatePosConfigInputData } }) =>
      apiClient("@put/api/pos-configs/:id", {
        params: { id: arg.id },
        body: arg.data,
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(POS_CONFIG_KEY, data.id)),
    },
  );
};

export const useRemovePosConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POS_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/pos-configs/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(POS_CONFIG_KEY, { organizationId })),
        ),
    },
  );
};

export const useRemoveTerminalConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POS_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/pos-configs/terminal-configs/:id", {
        params: { id: arg },
        ...apiConfig,
      }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(POS_CONFIG_KEY, { organizationId })),
        ),
    },
  );
};
