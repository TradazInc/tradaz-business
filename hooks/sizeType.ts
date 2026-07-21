import { SizeType } from "@/entities/SizeType";
import { ApiClient } from "@/lib/apiClient";
import useSWR from "swr";

const sizeTypeService = new ApiClient<SizeType>("/api/size-types");

export const useSizeTypes = () => {
  return useSWR("size-types", () => sizeTypeService.getAll());
};
