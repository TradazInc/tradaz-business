import { computePath } from "@/utilities/computePath";
import { Menu, Portal } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface Props {
  activeBusiness?: string;
  data?: Array<{ name: string; id: string }> | null;
  dataType: "business" | "store";
  handleClick: (id: string) => Promise<unknown>;
  children: React.ReactNode;
}

export const BusinessSelectorItem = ({
  data,
  dataType,
  handleClick,
  children,
  activeBusiness,
}: Props) => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>{children}</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {data && data.length > 0 ? (
              data.map((item) => (
                <Menu.Item
                  key={item.id}
                  value={item.id}
                  onClick={() => handleClick(item.id)}
                  asChild
                >
                  <NextLink
                    href={computePath({
                      businessId:
                        dataType === "business" ? item.id : activeBusiness,
                      storeId: dataType === "store" ? item.id : undefined,
                    })}
                  >
                    {item.name}
                  </NextLink>
                </Menu.Item>
              ))
            ) : (
              <Menu.Item value="">Nothing found</Menu.Item>
            )}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
};
