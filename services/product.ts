import { toaster } from "@/components/ui/toaster";
import { ApiClient } from "@/lib/apiClient";
import { ProductData } from "@/schema/product";

interface Product {
  id: string;
}

const productService = new ApiClient<Product>("/api/products");

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
