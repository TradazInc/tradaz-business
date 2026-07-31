import { toaster } from "@/components/ui/toaster";
import { ProductData } from "@/schema/product";
import { productService } from "../services/product";

export async function createProduct(product: ProductData) {
  try {
    return await productService.post({ body: product });
  } catch (error) {
    toaster.create({
      title: "Could not create product",
      description: error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
  }
}

export async function getProduct(id: string) {
  try {
    return await productService.get(id);
  } catch (error) {
    toaster.create({
      title: "Failed to fetch product",
      description: error instanceof Error ? error.message : "Please try again.",
      type: "error",
    });
  }
}
