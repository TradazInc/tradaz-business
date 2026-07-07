"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import tradazDark from "@/public/tradazDark.png";
import tradazLight from "@/public/tradazLight.png";
import { Image } from "@chakra-ui/react";

const TradazLogo = () => {
  const logo = useColorModeValue(tradazLight, tradazDark);

  return <Image src={logo.src} maxW={{ base: 100, md: 200 }} marginX={1} />;
};

export default TradazLogo;
