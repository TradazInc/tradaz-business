"use client";

import {
  createListCollection,
  Group,
  Input,
  Portal,
  Select,
} from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  filterFields: string[];
  placeholder: string;
}

export default function Search({ filterFields, placeholder }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filterField, setFilterField] = useState(filterFields[0]);

  const handleSearch = useDebouncedCallback((filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterValue) {
      params.set(filterField, filterValue);
    } else {
      params.delete(filterField);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const filterFieldCollection = useMemo(
    () =>
      createListCollection({
        items: filterFields.map((f) => ({ label: f, value: f })),
      }),
    [filterFields],
  );

  return (
    <Group attached w={"full"} maxW={"sm"}>
      <Input
        flex={"1"}
        color={"white"}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(filterField)?.toString()}
      />
      <Select.Root
        maxW={20}
        bg={"bg.subtle"}
        value={[filterField]}
        collection={filterFieldCollection}
        onValueChange={(e) => setFilterField(e.value[0])}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select filter" />
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {filterFieldCollection.items.map((filterField) => (
                <Select.Item item={filterField} key={filterField.value}>
                  {filterField.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Group>
  );
}
