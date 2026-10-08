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
          <Icon p={1} rounded={"full"} size={"2xl"} borderWidth={"1px"}>
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

        <Card.Description my={1}>
          <DataList.Root orientation={"horizontal"}>
            {cart.couponCode && (
              <DataList.Item key={cart.couponCode}>
                <DataList.ItemLabel>Coupon</DataList.ItemLabel>
                <DataList.ItemValue>{cart.couponCode}</DataList.ItemValue>
              </DataList.Item>
            )}
            {cart.depositAmount && cart.depositAmount > 0 && (
              <DataList.Item key={cart.depositAmount}>
                <DataList.ItemLabel>Deposit</DataList.ItemLabel>
                <DataList.ItemValue>{cart.depositAmount}</DataList.ItemValue>
              </DataList.Item>
            )}
            {cart.points && cart.points > 0 && (
              <DataList.Item key={cart.points}>
                <DataList.ItemLabel>Points</DataList.ItemLabel>
                <DataList.ItemValue>{cart.points}</DataList.ItemValue>
              </DataList.Item>
            )}
          </DataList.Root>
        </Card.Description>
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
