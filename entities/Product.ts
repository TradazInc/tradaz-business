export interface Product {
  id: string;
  name: string;
  brand: string;
  gender: "male" | "female" | "unisex";
  description: string;
  discountPercentage: number;
  categoryId: string;
  sizeTypeId: string;
  images: Image[];
  variations: Variation[];
}

interface Variation {
  id: string;
  sku: string;
  color: string;
  price: number;
  sizeId: string;
  teamVariations: TeamVariation[];
}

interface TeamVariation {
  teamId: string;
  quantity: number;
}

interface Image {
  id: string;
  url: string;
}
