import { SWRInfiniteConfig } from "@/lib/apiClient";
import { SizeTypeData } from "@/schema/sizeType";
import { SIZE_TYPE_KEY } from "@/data/cacheKeys";
import { getCursorKey } from "@/utilities/getPageKey";
import { useSWRConfig } from "swr";
import useSWRInfinite, { unstable_serialize } from "swr/infinite";
import useSWRMutation from "swr/mutation";
import { SizeType, sizeTypeService } from "../entities/sizeType";

export const useSizeTypes = (
  organizationId?: string,
  configs?: SWRInfiniteConfig<SizeType>,
) => {
  return useSWRInfinite(
    getCursorKey(SIZE_TYPE_KEY, { organizationId }),
    ([key, query]) => sizeTypeService.getAll({ query, throw: true }),
    configs,
  );
};

export const useAddSizeTypes = (organizationId?: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    organizationId ? [SIZE_TYPE_KEY, organizationId] : null,
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

export const useRemoveSizeType = (organizationId?: string) => {
  const { mutate } = useSWRConfig();

  return useSWRMutation(
    organizationId ? [SIZE_TYPE_KEY, organizationId] : null,
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
