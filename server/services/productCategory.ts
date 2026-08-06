import { productCategoryService } from "../entities/productCategory";

export async function getProductCategories() {
  return productCategoryService.getAll();
}
