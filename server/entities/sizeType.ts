import { ApiClient } from "@/lib/apiClient";

export interface SizeType {
  id: string;
  name: string;
  sizes?: Size[];
}

export interface Size {
  id: string;
  value: string;
  sizeTypeId: string;
}

export const sizeTypeService = new ApiClient<SizeType>("/api/size-types");
