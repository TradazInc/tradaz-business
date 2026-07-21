import { Size } from "@/entities/Size";
import { ApiClient } from "@/lib/apiClient";
import useSWR from "swr";

const sizeService = new ApiClient<Size>("/api/sizes");

export const useSizes = (sizeTypeId: string) => {
  return useSWR(`sizes/${sizeTypeId}`, () =>
    sizeService.getAll({ query: { sizeTypeId } }),
  );
};
