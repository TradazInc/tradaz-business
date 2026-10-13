import { List, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { SideMenuItem } from "./SideMenuItems";

interface Props {
  basePath: string;
  menuItems: SideMenuItem;
}

export const SideMenuSection = ({ menuItems, basePath }: Props) => {
  return (
    <VStack w={"full"} align={"stretch"}>
      <Text fontWeight={"semibold"} textStyle={"sm"}>
        {menuItems.label}
      </Text>
      <List.Root gap={0} variant={"plain"} align={"center"}>
        {menuItems.children?.map((item, index) => (
          <List.Item
            key={index}
            cursor={"pointer"}
            color={"fg.muted"}
            _hover={{ color: "fg" }}
            asChild
          >
            <NextLink href={`${basePath}${item.path}`}>
              <List.Indicator asChild>{item.icon}</List.Indicator>
              {item.label}
            </NextLink>
          </List.Item>
        ))}
      </List.Root>
    </VStack>
  );
};
