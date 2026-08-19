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
      sizeId: v.size ? [v.size.id] : [], // size is cleared when its Size row is deleted
      teamVariations: v.teamVariations.map((tv) => ({
        id: tv.id,
        teamId: [tv.team.id],
        quantity: tv.quantity,
      })),
    })),
  };
}
