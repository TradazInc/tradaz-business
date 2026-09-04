import { SHIPPING_CONFIG_KEY } from "@/data/cacheKeys";
import {
  ShippingConfig,
  shippingConfigService,
} from "@/entities/shippingConfig";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { ShippingConfigData } from "@/schema/shippingConfig";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useShippingConfigs = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<ShippingConfig>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(SHIPPING_CONFIG_KEY, query),
    ([key, query]) => shippingConfigService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddShippingConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: ShippingConfigData }) =>
      shippingConfigService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(SHIPPING_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};

export const useRemoveShippingConfig = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SHIPPING_CONFIG_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      shippingConfigService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(
            getCursorKey(SHIPPING_CONFIG_KEY, { organizationId }),
          ),
        ),
    },
  );
};
