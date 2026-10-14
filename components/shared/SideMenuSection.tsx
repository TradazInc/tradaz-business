"use client";

import { List, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { SideMenuItem } from "./SideMenuItems";
import { usePathname } from "next/navigation";

interface Props {
  basePath: string;
  menuItem: SideMenuItem;
}

export const SideMenuSection = ({ menuItem, basePath }: Props) => {
  const pathname = usePathname();

  return (
    <VStack w={"full"} align={"stretch"}>
      <Text fontWeight={"semibold"} textStyle={"sm"}>
        {menuItem.label}
      </Text>
      <List.Root gap={2} variant={"plain"} align={"center"}>
        {menuItem.children?.map((item, index) => {
          const href = `${basePath}${item.path}`;
          const isActive = pathname === href;
          return (
            <List.Item
              key={index}
              textStyle={"sm"}
              color={"fg.muted"}
              _hover={{ color: "fg" }}
              _currentPage={{ color: "fg", fontWeight: "bold" }}
              asChild
            >
              <NextLink
                href={href}
                aria-current={isActive ? "page" : undefined}
              >
                <List.Indicator asChild>{item.icon}</List.Indicator>
                {item.label}
              </NextLink>
            </List.Item>
          );
        })}
      </List.Root>
    </VStack>
  );
};
