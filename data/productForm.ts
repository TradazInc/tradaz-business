import { Gender } from "@/server/entities/product";
import {
  ProductFormValues,
  TeamVariationFormValues,
  VariationFormValues,
} from "@/schema/product";

export const emptyProduct: ProductFormValues = {
  name: "",
  brand: "",
  gender: Gender.unisex,
  description: "",
  discountPercentage: 0,
  categoryId: [],
  sizeTypeId: [],
  images: [],
  variations: [],
};

export const emptyVariation: VariationFormValues = {
  color: "#000000",
  price: 0,
  sizeId: [],
  teamVariations: [],
};

export const emptyTeamVariation: TeamVariationFormValues = {
  teamId: [],
  quantity: 0,
};
