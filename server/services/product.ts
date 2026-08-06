import { ProductData } from "@/schema/product";
import { productService } from "../entities/product";

export async function createProduct(product: ProductData) {
  return productService.post({ body: product });
}

export async function getProduct(id: string) {
  return productService.get(id);
}
