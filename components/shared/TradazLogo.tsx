"use client";

import tradazDark from "@/public/tradazDark.png";
import tradazLight from "@/public/tradazLight.png";
import { Image, ImageProps } from "@chakra-ui/react";

const TradazLogo = (props: ImageProps) => (
  <>
    <Image
      src={tradazLight.src}
      maxW={{ base: 100, md: 150 }}
      _dark={{ display: "none" }}
      {...props}
    />
    <Image
      src={tradazDark.src}
      maxW={{ base: 100, md: 150 }}
      display="none"
      _dark={{ display: "block" }}
      {...props}
    />
  </>
);

export default TradazLogo;
