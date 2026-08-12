import { SizeFormValues, SizeTypeFormValues } from "@/schema/sizeType";

export const emptySize: SizeFormValues = {
  value: "",
};

export const emptySizeType: SizeTypeFormValues = {
  name: "",
  sizes: [emptySize],
};
