"use client";

import { GetAllCartsOutputItemData } from "@/schema/cart";
import {
  Button,
  Card,
  DataList,
  HStack,
  Icon,
  LinkOverlay,
  Span,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import NextLink from "next/link";
import { MdDeleteOutline, MdShoppingCartCheckout } from "react-icons/md";

interface Props {
  href: string;
  cart: GetAllCartsOutputItemData;
  disabled: boolean;
  onClick: (id: string) => void;
}

const CartCard = ({ cart, href, onClick, disabled }: Props) => {
  return (
    <Card.Root w={"full"} p={5} borderWidth={"1px"} rounded={"md"} asChild>
      <Card.Body gap={0}>
        <HStack gap={3}>
          <Icon p={1.5} rounded={"full"} size={"2xl"} borderWidth={"1px"}>
            <MdShoppingCartCheckout />
          </Icon>
          <Text fontWeight={"semibold"} textStyle={"sm"}></Text>
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

        <DataList.Root orientation={"horizontal"} my={1}>
          {cart.couponCode && (
            <DataList.Item>
              <DataList.ItemLabel>Coupon</DataList.ItemLabel>
              <DataList.ItemValue>{cart.couponCode}</DataList.ItemValue>
            </DataList.Item>
          )}
          {(cart.depositAmount ?? 0) > 0 && (
            <DataList.Item>
              <DataList.ItemLabel>Deposit</DataList.ItemLabel>
              <DataList.ItemValue>{cart.depositAmount}</DataList.ItemValue>
            </DataList.Item>
          )}
          {(cart.points ?? 0) > 0 && (
            <DataList.Item>
              <DataList.ItemLabel>Points</DataList.ItemLabel>
              <DataList.ItemValue>{cart.points}</DataList.ItemValue>
            </DataList.Item>
          )}
        </DataList.Root>
      </Card.Body>

      <Card.Footer>
        <Button
          variant={"subtle"}
          disabled={disabled}
          colorPalette={"red"}
          onClick={() => onClick(cart.id)}
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
