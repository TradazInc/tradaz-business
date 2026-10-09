"use client";

import { GetAllCartsOutputItemData } from "@/schema/cart";
import { Avatar, Card, HStack, Span, Text } from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import NextLink from "next/link";
import { MdShoppingCartCheckout } from "react-icons/md";
import CardDeleteButton from "./CardDeleteButton";
import CardViewButton from "./CardViewButton";

interface Props {
  href: string;
  cart: GetAllCartsOutputItemData;
  onClick: (id: string) => void;
}

const CartCard = ({ cart, href, onClick }: Props) => {
  return (
    <Card.Root size={"sm"} flexDirection={"row"} alignItems={"center"}>
      <Avatar.Root variant={"outline"} size={"lg"} ms={2}>
        <Avatar.Fallback>
          <MdShoppingCartCheckout />
        </Avatar.Fallback>
      </Avatar.Root>

      <Card.Body gap={1.5}>
        <HStack justifyContent={"flex-start"}>
          <Text fontWeight={"semibold"} textStyle={"sm"} maxW={28} truncate>
            Cart {cart.id}
          </Text>
          <Span asChild color={"fg.muted"} textStyle={"sm"}>
            <time dateTime={cart.createdAt}>
              {formatDistanceToNowStrict(new Date(cart.createdAt), {
                addSuffix: true,
              })}
            </time>
          </Span>
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

      <Card.Footer justifyContent={"flex-end"}>
        <CardViewButton asChild>
          <NextLink href={href}>View</NextLink>
        </CardViewButton>
        <CardDeleteButton onClick={() => onClick(cart.id)}>
          Delete
        </CardDeleteButton>
      </Card.Footer>
    </Card.Root>
  );
};

export default CartCard;
