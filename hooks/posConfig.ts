import { POS_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import {
  CreatePosConfigInputData,
  GetAllPosConfigOutputData,
  GetAllPosConfigQuerySchema,
  UpdatePosConfigInputData,
} from "@/schema/posConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { scopeHeaders } from "@/utilities/scopeHeaders";
import { useSWRConfig } from "swr";
import useSWRInfinite, {
  SWRInfiniteConfiguration,
  unstable_serialize,
} from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { useSearchQuery } from "./searchQuery";

export const usePosConfigs = (
  organizationId: string | undefined,
  teamId: string | undefined,
  config?: SWRInfiniteConfiguration<GetAllPosConfigOutputData, Error>,
) => {
  const query = useSearchQuery(GetAllPosConfigQuerySchema);

  return useSWRInfinite(
    getCursorKey(POS_CONFIG_KEY, { ...query, organizationId, teamId }),
    ([key, { organizationId, teamId, ...query }]) =>
      apiClient("@get/api/pos-configs", {
        query,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    config,
  );
};

export const useAddPosConfig = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(
      getCursorKey(POS_CONFIG_KEY, { organizationId, teamId }),
    ),
    (key, { arg }: { arg: CreatePosConfigInputData }) =>
      apiClient("@post/api/pos-configs", {
        body: arg,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
  );
};

export const useUpdatePosConfig = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    unstable_serialize(
      getCursorKey(POS_CONFIG_KEY, { organizationId, teamId }),
    ),
    (key, { arg }: { arg: { id: string; data: UpdatePosConfigInputData } }) =>
      apiClient("@put/api/pos-configs/:id", {
        params: { id: arg.id },
        body: arg.data,
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
    {
      onSuccess: (data) => mutate(getScopedKey(POS_CONFIG_KEY, data.id)),
    },
  );
};

export const useRemovePosConfig = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(
      getCursorKey(POS_CONFIG_KEY, { organizationId, teamId }),
    ),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/pos-configs/:id", {
        params: { id: arg },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
  );
};

export const useRemoveTerminalConfig = (
  organizationId: string | undefined,
  teamId: string | undefined,
) => {
  return useSWRMutation(
    unstable_serialize(
      getCursorKey(POS_CONFIG_KEY, { organizationId, teamId }),
    ),
    (key, { arg }: { arg: string }) =>
      apiClient("@delete/api/pos-configs/terminal-configs/:id", {
        params: { id: arg },
        headers: scopeHeaders(organizationId, teamId),
        ...apiConfig,
      }),
  );
};
