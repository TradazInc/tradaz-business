import { List, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { SideMenuItem } from "./SideMenuItems";

interface Props {
  basePath: string;
  menuItems: SideMenuItem;
}

export const SideMenuSection = ({ menuItems, basePath }: Props) => {
  return (
    <VStack w={"full"}>
      <Text
        color={"fg.subtle"}
        fontWeight={"semibold"}
        textTransform={"uppercase"}
      >
        {menuItems.label}
      </Text>
      <List.Root gap={2} variant={"plain"} align={"center"}>
        {menuItems.children?.map((item, index) => (
          <List.Item key={index} asChild>
            <NextLink href={`${basePath}${item.path}`}>
              <List.Indicator asChild color="green.500">
                {item.icon}
              </List.Indicator>
              {item.label}
            </NextLink>
          </List.Item>
        ))}
      </List.Root>
    </VStack>
  );
};
