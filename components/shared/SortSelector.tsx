"use client";

import { createListCollection, HStack, Portal, Select } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  sortOptions: { label: string; value: string }[];
  sortDirections: { label: string; value: string }[];
  placeholder: string;
}

export default function SortSelector({
  sortOptions,
  sortDirections,
  placeholder,
}: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const options = createListCollection({ items: sortOptions });
  const directions = createListCollection({ items: sortDirections });

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortBy) {
      params.set("sortBy", sortBy);
    } else {
      params.delete("sortBy");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSortDirection = (sortDirection: string) => {
    const params = new URLSearchParams(searchParams);
    if (sortDirection) {
      params.set("sortDirection", sortDirection);
    } else {
      params.delete("sortDirection");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <HStack gapX={2}>
      <Select.Root
        collection={options}
        defaultValue={
          searchParams.get("sortBy")?.toString()
            ? [searchParams.get("sortBy")?.toString()!]
            : undefined
        }
        onValueChange={(e) => handleSortBy(e.value[0])}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {options.items.map((option) => (
                <Select.Item item={option} key={option.value}>
                  {option.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>

      <Select.Root
        collection={directions}
        defaultValue={
          searchParams.get("sortDirection")?.toString()
            ? [searchParams.get("sortDirection")?.toString()!]
            : undefined
        }
        onValueChange={(e) => handleSortDirection(e.value[0])}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={"Sort direction"} />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {directions.items.map((direction) => (
                <Select.Item item={direction} key={direction.value}>
                  {direction.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </HStack>
  );
}
