import { ProductData } from "@/schema/product";
import { productService } from "../entities/product";
import { BetterFetchError } from "@better-fetch/fetch";

export async function createProduct(product: ProductData) {
  try {
    const data = await productService.post({ body: product });
    return { data };
  } catch (err) {
    const error = err as BetterFetchError;
    return { error };
  }
}

export async function getProduct(id: string) {
  try {
    const data = await productService.get(id);
    return { data };
  } catch (err) {
    const error = err as BetterFetchError;
    return { error };
  }
}
