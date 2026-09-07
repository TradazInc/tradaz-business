import { POS_CONFIG_KEY } from "@/data/cacheKeys";
import { PosConfig, posConfigService } from "@/entities/posConfig";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { PosConfigData } from "@/schema/posConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const usePosConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<PosConfig>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(POS_CONFIG_KEY, query),
    ([key, query]) => posConfigService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddPosConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POS_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: PosConfigData }) =>
      posConfigService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(POS_CONFIG_KEY, { organizationId })),
        ),
    },
  );
};

export const useRemovePosConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(POS_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      posConfigService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(POS_CONFIG_KEY, { organizationId })),
        ),
    },
  );
};
