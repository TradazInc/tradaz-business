"use client";

import { Input, InputGroup } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  filterBy: string;
  placeholder: string;
}

export default function Search({ filterBy, placeholder }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((filterValue: string) => {
    const params = new URLSearchParams(searchParams);
    if (filterValue) {
      params.set("filterValue", filterValue);
      params.set("filterBy", filterBy);
    } else {
      params.delete("filterValue");
      params.delete("filterBy");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <InputGroup startElement={<LuSearch />} w={72}>
      <Input
        size={"xs"}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        color={"white"}
        borderRadius={"full"}
        defaultValue={searchParams.get(filterBy)?.toString()}
      />
    </InputGroup>
  );
}
