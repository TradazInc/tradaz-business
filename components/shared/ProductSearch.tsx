"use client";

import { useProducts } from "@/hooks/product";
import { GetAllProductOutputVariationData } from "@/schema/product";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Button,
  Combobox,
  createListCollection,
  FormatNumber,
  HStack,
  Portal,
  Span,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useId, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  businessId: string | undefined;
  placeholder: string;
  searchField: string;
  onSelect?: (variation: GetAllProductOutputVariationData) => void;
}

const ProductSearch = ({
  businessId,
  placeholder,
  searchField,
  onSelect,
}: Props) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollId = useId();

  const handleSearch = useDebouncedCallback((searchValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchValue) params.set(searchField, searchValue);
    else params.delete(searchField);
    replace(`${pathname}?${params.toString()}`);
  }, 200);

  const { data, error, isLoading, setSize, size, mutate } = useProducts(
    businessId,
    { keepPreviousData: true },
  );
  const { flatData: products, hasMore } = useMemo(
    () => parseCursorData(data),
    [data, pathname, searchParams],
  );

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
    [products, pathname, searchParams],
  );

  return (
    <Combobox.Root
      maxW={"sm"}
      width={"full"}
      invalid={!!error}
      collection={collection}
      selectionBehavior={"clear"}
      defaultInputValue={searchParams.get(searchField) ?? ""}
      onInputValueChange={(e) => handleSearch(e.inputValue)}
      onValueChange={(e) => e.items[0] && onSelect?.(e.items[0])}
      positioning={{ sameWidth: false, placement: "bottom-start" }}
    >
      <Combobox.Control>
        <Combobox.Input placeholder={placeholder} />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content id={scrollId} minW="sm" maxH="xs" overflowY="auto">
            {isLoading ? (
              <HStack p="2">
                <Spinner size="xs" borderWidth="1px" />
                <Span>Loading products...</Span>
              </HStack>
            ) : (
              <>
                <Combobox.Empty>No products found</Combobox.Empty>
                <InfiniteScroll
                  dataLength={products.length}
                  hasMore={hasMore && !error}
                  next={() => setSize(size + 1)}
                  loader={<Spinner size="xs" />}
                  scrollableTarget={scrollId}
                >
                  {collection.items.map((variation) => (
                    <Combobox.Item key={variation.id} item={variation}>
                      <Stack gap="0" flex="1" minW="0">
                        <HStack justify="space-between" textStyle="sm">
                          <Span fontWeight="medium" truncate>
                            {variation.productName}
                          </Span>
                          <Span fontWeight="semibold">
                            <FormatNumber
                              value={variation.price}
                              style="currency"
                              currency="NGN"
                            />
                          </Span>
                        </HStack>
                        <Span color="fg.muted" textStyle="xs" truncate>
                          {[
                            variation.sku && `SKU ${variation.sku}`,
                            variation.color,
                            variation.size?.value,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </Span>
                      </Stack>
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </InfiniteScroll>
              </>
            )}
            {error && (
              <Stack p="2" gap="2">
                <Span color="fg.error" textStyle="sm">
                  Couldn&apos;t load products
                </Span>
                <Button size="xs" variant="subtle" onClick={() => mutate()}>
                  Retry
                </Button>
              </Stack>
            )}
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  );
};

export default ProductSearch;
