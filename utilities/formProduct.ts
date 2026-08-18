import { Product } from "@/server/entities/product";

export function formProduct(product: Product) {
  return {
    ...product,
    images: product.images.map(({ url }) => url),
    categoryId: [product.category.id],
    sizeTypeId: [product.sizeType?.id],
    variations: product.variations.map((v) => ({
      id: v.id,
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
