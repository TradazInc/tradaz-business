import { serverHeaders } from "@/utilities/serverHeaders";
import { productCategoryService } from "../services/productCategories";

export async function getProductCategories() {
  try {
    return await productCategoryService.getAll({
      headers: await serverHeaders(),
    });
  } catch (error) {
    throw new Error("Could not fetch product categories");
  }
}
