import { Card, Heading, LinkOverlay, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  logo?: null;
  name: string;
  createdAt?: string;
  href: string;
}

const CartCard = ({ name, createdAt, href }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <Heading size={"sm"}>{name}</Heading>
      </Card.Header>
      <Card.Footer>{createdAt}</Card.Footer>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default CartCard;
