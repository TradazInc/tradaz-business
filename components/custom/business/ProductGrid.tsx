"use client";

import { FetchResponse } from "@/lib/apiClient";
import { Product } from "@/entities/product";
import { useProducts } from "@/hooks/product";
import { computePath } from "@/utilities/computePath";
import { parseCursorData } from "@/utilities/parsePageData";
import { Button, For, Spinner, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GridContainer from "../shared/GridContainer";
import ProductCard from "./ProductCard";

interface Props {
  initialProducts: FetchResponse<Product>;
  businessId: string | undefined;
}

const ProductGrid = ({ businessId, initialProducts }: Props) => {
  const { data, size, setSize, error, mutate } = useProducts(businessId, {
    fallbackData: [initialProducts],
  });
  const { flatData: products, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={() => setSize(size + 1)}
      hasMore={hasMore && !error}
      loader={<Spinner />}
    >
      <GridContainer pb={12}>
        <For each={products}>
          {(product) => (
            <ProductCard
              key={product.id}
              product={product}
              href={`${computePath(businessId)}/products/${product.id}`}
            />
          )}
        </For>
      </GridContainer>
      {error && (
        <>
          <Button
            w={"full"}
            size={"md"}
            variant={"subtle"}
            onClick={() => mutate()}
          >
            Click to retry
          </Button>
          <Text>"Products unavailable. Retry to continue."</Text>
        </>
      )}
    </InfiniteScroll>
  );
};

export default ProductGrid;
