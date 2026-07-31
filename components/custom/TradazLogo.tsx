"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import tradazDark from "@/public/tradazDark.png";
import tradazLight from "@/public/tradazLight.png";
import { Image, ImageProps } from "@chakra-ui/react";

const TradazLogo = (props: ImageProps) => {
  const logo = useColorModeValue(tradazLight, tradazDark);

  return <Image src={logo.src} maxW={{ base: 100, md: 150 }} {...props} />;
};

export default TradazLogo;
