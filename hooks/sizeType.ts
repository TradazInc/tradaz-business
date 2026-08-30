import { SIZE_TYPE_KEY } from "@/data/cacheKeys";
import { SizeType, sizeTypeService } from "@/entities/sizeType";
import { SWRInfiniteConfig } from "@/lib/apiClient";
import { SizeTypeData } from "@/schema/sizeType";
import { getCursorKey, getScopedKey } from "@/utilities/computeKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";

export const useSizeTypes = (
  organizationId: string | undefined,
  configs?: SWRInfiniteConfig<SizeType>,
) => {
  return useSWRInfinite(
    getCursorKey(SIZE_TYPE_KEY, { organizationId }),
    ([key, query]) => sizeTypeService.getAll({ query, throw: true }),
    configs,
  );
};

export const useAddSizeTypes = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SIZE_TYPE_KEY, organizationId),
    (key, { arg }: { arg: SizeTypeData }) =>
      sizeTypeService.post({ body: arg, throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SIZE_TYPE_KEY, { organizationId })),
        ),
    },
  );
};

export const useRemoveSizeType = (organizationId: string | undefined) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    getScopedKey(SIZE_TYPE_KEY, organizationId),
    (key, { arg }: { arg: string }) =>
      sizeTypeService.delete(arg, { throw: true }),
    {
      onSuccess: () =>
        mutate(
          unstable_serialize(getCursorKey(SIZE_TYPE_KEY, { organizationId })),
        ),
    },
  );
};
