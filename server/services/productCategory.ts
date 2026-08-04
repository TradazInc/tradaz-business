import { BetterFetchError } from "@better-fetch/fetch";
import { productCategoryService } from "../entities/productCategory";

export async function getProductCategories() {
  try {
    const data = await productCategoryService.getAll();
    return { data };
  } catch (err) {
    const error = err as BetterFetchError;
    return { error };
  }
}
