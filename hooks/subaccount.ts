import { SUBACCOUNT_KEY } from "@/data/cacheKeys";
import { Subaccount, subaccountService } from "@/entities/subaccount";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { SubaccountData } from "@/schema/subaccount";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { searchQuery } from "@/utilities/searchQuery";
import { useSearchParams } from "next/navigation";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useProductCategories = (
  organizationId: string | undefined,
  config?: SWRInfiniteConfig<Subaccount>,
) => {
  const searchParams = useSearchParams();
  const query = { organizationId, ...searchQuery(searchParams) };

  return useSWRInfinite(
    getCursorKey(SUBACCOUNT_KEY, query),
    ([key, query]) => subaccountService.getAll({ query, throw: true }),
    config,
  );
};

export const useAddSubaccount = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SUBACCOUNT_KEY, organizationId),
    (key, { arg }: { arg: SubaccountData }) =>
      subaccountService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SUBACCOUNT_KEY, { organizationId })),
        ),
    },
  );
};

export const useUpdateSubaccount = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SUBACCOUNT_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      subaccountService.update(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SUBACCOUNT_KEY, { organizationId })),
        ),
    },
  );
};
