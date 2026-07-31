import { Product } from "@/apis/services/product";

export function formProduct(product: Product) {
  return {
    ...product,
    categoryId: [product.categoryId],
    sizeTypeId: [product.sizeTypeId],
    variations: product.variations.map((v) => ({
      id: v.id,
      sku: v.sku,
      color: v.color,
      price: v.price,
      sizeId: [v.sizeId],
      teamVariations: v.teamVariations.map((tv) => ({
        id: tv.id,
        teamId: [tv.teamId],
        quantity: tv.quantity,
      })),
    })),
  };
}
