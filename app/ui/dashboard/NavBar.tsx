import { ColorModeButton } from "@/components/ui/color-mode";
import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import TradazLogo from "../TradazLogo";
import { BusinessSelector } from "./BusinessSelector";
import Notification from "./Notification";
import { ProfileDrawer } from "./ProfileDrawer";

export const NavBar = () => {
  return (
    <HStack
      justify={"space-between"}
      px={4}
      py={2}
      w={"full"}
      bg={"bg.panel"}
      borderBottomWidth={"1px"}
      borderColor={"bg.emphasized"}
    >
      <HStack gap="2">
        <Link href={"/dashboard"}>
          <TradazLogo h={3} />
        </Link>
        <BusinessSelector />
      </HStack>

      <HStack gap="2">
        <ColorModeButton rounded={"full"} variant={"outline"} />
        <Notification />
        <ProfileDrawer />
      </HStack>
    </HStack>
  );
};
