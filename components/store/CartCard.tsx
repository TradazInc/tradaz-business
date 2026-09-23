"use client";

import { Button, Card, Heading, LinkOverlay } from "@chakra-ui/react";
import NextLink from "next/link";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  id: string;
  name: string;
  href: string;
  disabled: boolean;
  onClick: (id: string) => void;
}

const CartCard = ({ id, name, href, onClick, disabled }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <Heading size={"sm"}>{name}</Heading>
      </Card.Header>

      <Card.Body>Card body</Card.Body>

      <Card.Footer>
        <Button
          variant={"subtle"}
          colorPalette={"red"}
          flex={"1"}
          onClick={() => onClick(id)}
          disabled={disabled}
        >
          <MdDeleteOutline />
          Delete
        </Button>
      </Card.Footer>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default CartCard;
