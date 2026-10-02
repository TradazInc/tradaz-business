"use client";

import { useProducts } from "@/hooks/product";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Button,
  Combobox,
  createListCollection,
  HStack,
  Portal,
  Span,
  Spinner,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  businessId: string | undefined;
  storeId: string | undefined;
  placeholder: string;
  searchField: string;
}

const ProductSearch = ({ businessId, placeholder, searchField }: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchValue) {
      params.set(searchField, searchValue);
    } else {
      params.delete(searchField);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const { data, error, isLoading, setSize, size, mutate } =
    useProducts(businessId);
  const { flatData: products, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const scrollId = useId();

  const collection = useMemo(
    () =>
      createListCollection({
        items: products.flatMap((product) =>
          (product.variations ?? []).map((variation) => ({
            ...variation,
            productName: product.name,
          })),
        ),
        itemToString: (item) => item.productName,
        itemToValue: (item) => item.id,
      }),
    [products],
  );

  return (
    <Combobox.Root
      width="320px"
      invalid={!!error}
      collection={collection}
      placeholder={placeholder}
      onInputValueChange={(e) => handleSearch(e.inputValue)}
      positioning={{ sameWidth: false, placement: "bottom-start" }}
    >
      <Combobox.Label>Search Products</Combobox.Label>

      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          {isLoading ? (
            <Spinner size="sm" />
          ) : (
            <>
              <Combobox.ClearTrigger />
              <Combobox.Trigger />
            </>
          )}
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content minW="sm" id={scrollId}>
            <InfiniteScroll
              dataLength={products.length}
              hasMore={hasMore && !error}
              next={() => setSize(size + 1)}
              loader={<Spinner size={"xs"} />}
              scrollableTarget={scrollId}
            >
              {collection.items?.map((variation) => (
                <Combobox.Item key={variation.id} item={variation}>
                  <HStack justify="space-between" textStyle="sm">
                    <Span fontWeight="medium" truncate>
                      {variation.productName}
                    </Span>
                    <Span color="fg.muted" truncate>
                      {variation.price}price / {variation.sku}sku /
                      {variation.color}
                      color / {variation?.size?.value ?? "n/a"}size
                    </Span>
                  </HStack>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
              ))}
            </InfiniteScroll>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
      {error && (
        <Button
          w={"full"}
          size={"sm"}
          variant={"subtle"}
          onClick={() => mutate()}
        >
          Click to retry
        </Button>
      )}
    </Combobox.Root>
  );
};

export default ProductSearch;
