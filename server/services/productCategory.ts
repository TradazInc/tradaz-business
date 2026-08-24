import { PAGE_SIZE } from "@/data/constants";
import { productCategoryService } from "../entities/productCategory";

export async function getProductCategories(organizationId?: string) {
  return productCategoryService.getAll({
    query: { pageSize: PAGE_SIZE, organizationId },
  });
}
