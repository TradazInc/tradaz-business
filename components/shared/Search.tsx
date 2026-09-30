"use client";

import { Input, InputGroup } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LuSearch } from "react-icons/lu";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  placeholder: string;
  searchField: string;
}

export default function Search({ searchField, placeholder }: Props) {
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

  return (
    <InputGroup startElement={<LuSearch />} w={72}>
      <Input
        size={"xs"}
        color={"white"}
        borderRadius={"full"}
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(searchField)?.toString()}
      />
    </InputGroup>
  );
}
