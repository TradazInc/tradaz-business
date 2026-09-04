import { UICONFIG_KEY } from "@/data/cacheKeys";
import { UIConfig, uiConfigService } from "@/entities/uiConfig";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { UIConfigData } from "@/schema/uiConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useUIConfigs = (
  organizationId: string | undefined,
  configs?: SWRInfiniteConfig<UIConfig>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(UICONFIG_KEY, query),
    ([key, query]) => uiConfigService.getAll({ query, throw: true }),
    configs,
  );
};

export const useAddUIConfigs = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(UICONFIG_KEY, organizationId),
    (key, { arg }: { arg: UIConfigData }) =>
      uiConfigService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(UICONFIG_KEY, { organizationId })),
        ),
    },
  );
};

export const useRemoveUIConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(UICONFIG_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      uiConfigService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(UICONFIG_KEY, { organizationId })),
        ),
    },
  );
};
