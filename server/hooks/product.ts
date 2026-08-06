import { ProductData } from "@/schema/product";
import { PRODUCT_KEY } from "@/utilities/cacheKeys";
import useSWRMutation from "swr/mutation";
import { productService } from "../entities/product";

export const useAddProduct = () => {
  return useSWRMutation(
    PRODUCT_KEY,
    (url: string, { arg }: { arg: ProductData }) =>
      productService.post({ body: arg, throw: true }),
  );
};
