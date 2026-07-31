import { toaster } from "@/components/ui/toaster";
import { getAuthHeaders } from "@/utilities/serverHeaders";
import { productCategoryService } from "../services/productCategories";

export async function getProductCategories() {
  try {
    return await productCategoryService.getAll({
      headers: await getAuthHeaders(),
    });
  } catch (error) {
    toaster.create({
      title: "Failed to fetch product categories",
      description: error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
  }
}
