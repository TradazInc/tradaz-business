import { SUBACCOUNT_KEY } from "@/data/cacheKeys";
import { subaccountService } from "@/entities/subaccount";
import { SubaccountData } from "@/schema/subaccount";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

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
