import { PAGE_SIZE } from "@/data/constants";
import { productService } from "../entities/product";

export async function getProduct(id: string) {
  return productService.get(id);
}

export async function getProducts() {
  return productService.getAll({ query: { pageSize: PAGE_SIZE } });
}
