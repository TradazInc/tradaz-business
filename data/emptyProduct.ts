import { ProductFormValues } from "@/schema/product";

export const emptyProduct: ProductFormValues = {
  name: "",
  brand: "",
  gender: "unisex",
  description: "",
  discountPercentage: 0,
  categoryId: [],
  sizeTypeId: [],
  images: [],
  variations: [],
};
