import { UI_CONFIG_KEY } from "@/data/cacheKeys";
import { apiClient, apiConfig } from "@/lib/apiClient";
import { CreateUIConfigInputData } from "@/schema/uiConfig";
import { getScopedKey } from "@/utilities/computeKey";
import useSWR, { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";

export const useUIConfig = (organizationId: string | undefined) => {
  return useSWR(getScopedKey(UI_CONFIG_KEY, organizationId), () =>
    apiClient("@get/api/ui-configs", { ...apiConfig }),
  );
};

export const useAddUIConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(UI_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: CreateUIConfigInputData }) =>
      apiClient("@post/api/ui-configs", { body: arg, ...apiConfig }),
    {
      onSuccess: () => mutate(getScopedKey(UI_CONFIG_KEY, organizationId)),
    },
  );
};

export const useRemoveUIConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(UI_CONFIG_KEY, organizationId),
    () => apiClient("@delete/api/ui-configs", { ...apiConfig }),
    {
      onSuccess: () => mutate(getScopedKey(UI_CONFIG_KEY, organizationId)),
    },
  );
};
