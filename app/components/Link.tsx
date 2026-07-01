import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";

export const Link = ({
  href,
  children,
}: {
  href: string;
  children?: React.ReactNode;
}) => {
  return (
    <ChakraLink asChild>
      <NextLink href={href}>{children}</NextLink>
    </ChakraLink>
  );
};
