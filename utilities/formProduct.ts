import { Product } from "@/server/entities/product";

export function formProduct(product: Product) {
  return {
    ...product,
    images: product.images.map(({ url }) => url),
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
