import { UI_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient } from "@/lib/apiClient";
import {
  GetUIConfigOutputData,
  UpsertUIConfigInputData,
} from "@/schema/uiConfig";
import { getScopedKey } from "@/utilities/computeKey";
import useSWR, { SWRConfiguration, useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

// The API returns the organization's single config, so this is not paginated
export const useUIConfig = (
  organizationId: string | undefined,
  config?: SWRConfiguration<GetUIConfigOutputData, Error>,
) => {
  return useSWR(
    getScopedKey(UI_CONFIG_KEY, organizationId),
    () => apiClient("@get/api/ui-configs"),
    config,
  );
};

export const useUpsertUIConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(UI_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: UpsertUIConfigInputData }) =>
      apiClient("@post/api/ui-configs", { body: arg }),
    {
      onSuccess: () => mutate(getScopedKey(UI_CONFIG_KEY, organizationId)),
    },
  );
};

export const useRemoveUIConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(UI_CONFIG_KEY, organizationId),
    () => apiClient("@delete/api/ui-configs"),
    {
      onSuccess: () => mutate(getScopedKey(UI_CONFIG_KEY, organizationId)),
    },
  );
};
