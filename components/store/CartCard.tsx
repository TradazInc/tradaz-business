"use client";

import { GetAllCartsOutputItemData } from "@/schema/cart";
import {
  Box,
  Button,
  Card,
  DataList,
  Heading,
  LinkBox,
  LinkOverlay,
  Span,
  Text,
} from "@chakra-ui/react";
import { formatDistanceToNowStrict } from "date-fns";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  href: string;
  cart: GetAllCartsOutputItemData;
  disabled: boolean;
  onClick: (id: string) => void;
}

const CartCard = ({ cart, href, onClick, disabled }: Props) => {
  return (
    <Card.Root w={"full"} p={5} borderWidth={"1px"} rounded={"md"} asChild>
      <LinkBox>
        <Span asChild color={"fg.muted"} textStyle={"sm"}>
          <time dateTime={cart.createdAt}>
            {formatDistanceToNowStrict(new Date(cart.createdAt), {
              addSuffix: true,
            })}
          </time>
        </Span>

        <Heading size={"lg"} my={2}>
          <LinkOverlay href={href}>Cart {cart.id}</LinkOverlay>
        </Heading>

        <Text mb={3} color={"fg.muted"}>
          <DataList.Root orientation={"horizontal"}>
            {cart.couponCode && (
              <DataList.Item key={cart.couponCode}>
                <DataList.ItemLabel>Coupon</DataList.ItemLabel>
                <DataList.ItemValue>{cart.couponCode}</DataList.ItemValue>
              </DataList.Item>
            )}
            {cart.depositAmount && (
              <DataList.Item key={cart.depositAmount}>
                <DataList.ItemLabel>Deposit</DataList.ItemLabel>
                <DataList.ItemValue>{cart.depositAmount}</DataList.ItemValue>
              </DataList.Item>
            )}
            {cart.points && (
              <DataList.Item key={cart.points}>
                <DataList.ItemLabel>Points</DataList.ItemLabel>
                <DataList.ItemValue>{cart.points}</DataList.ItemValue>
              </DataList.Item>
            )}
          </DataList.Root>
        </Text>

        <Box w={"full"} justifyContent={"flex-end"}>
          <Button
            variant={"subtle"}
            disabled={disabled}
            colorPalette={"red"}
            onClick={() => onClick(cart.id)}
          >
            <MdDeleteOutline />
            Delete
          </Button>
        </Box>
      </LinkBox>
    </Card.Root>
  );
};

export default CartCard;
