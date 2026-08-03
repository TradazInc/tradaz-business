import { productCategoryService } from "../entities/productCategory";

export async function getProductCategories() {
  try {
    const data = await productCategoryService.getAll();
    return { data };
  } catch (error) {
    return { error };
  }
}
