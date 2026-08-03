import { ProductData } from "@/schema/product";
import { productService } from "../entities/product";

export async function createProduct(product: ProductData) {
  try {
    const data = await productService.post({ body: product });
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function getProduct(id: string) {
  try {
    const data = await productService.get(id);
    return { data };
  } catch (error) {
    return { error };
  }
}
