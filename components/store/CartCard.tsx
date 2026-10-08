"use client";

import { GetAllCartsOutputItemData } from "@/schema/cart";
import {
  Button,
  Card,
  HStack,
  Icon,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import NextLink from "next/link";
import { MdShoppingCartCheckout } from "react-icons/md";

interface Props {
  href: string;
  cart: GetAllCartsOutputItemData;
  onClick: (id: string) => void;
}

const CartCard = ({ cart, href, onClick }: Props) => {
  return (
    <Card.Root w={"full"} p={5} borderWidth={"1px"} rounded={"md"} asChild>
      <Card.Body>
        <HStack gap={3}>
          <Icon p={1.5} rounded={"full"} size={"2xl"} borderWidth={"1px"}>
            <MdShoppingCartCheckout />
          </Icon>
          <Stack gap={0}>
            <Text fontWeight={"semibold"} textStyle={"sm"}>
              Cart {cart.id}
            </Text>
            <Span asChild color={"fg.muted"} textStyle={"sm"}>
              <time dateTime={cart.createdAt}>
                {formatDistanceToNowStrict(new Date(cart.createdAt), {
                  addSuffix: true,
                })}
              </time>
            </Span>
          </Stack>
        </HStack>

        <Card.Description>
          {[
            cart.couponCode && `Coupon ${cart.couponCode}`,
            (cart.points ?? 0) > 0 && `Points ${cart.points}`,
            (cart.depositAmount ?? 0) > 0 && `Deposit ${cart.depositAmount}`,
          ]
            .filter(Boolean)
            .join(" · ")}
        </Card.Description>
      </Card.Body>

      <Card.Footer>
        <Button variant={"outline"} asChild>
          <NextLink href={href}>View</NextLink>
        </Button>
        <Button
          variant={"subtle"}
          colorPalette={"red"}
          onClick={() => onClick(cart.id)}
        >
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};

export default CartCard;
