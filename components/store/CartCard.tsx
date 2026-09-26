"use client";

import noImage from "@/public/no-image-placeholder.webp";
import { CartListItemData } from "@/schema/cart";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  DataList,
  Image,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import { MdDeleteOutline, MdOutlineViewInAr } from "react-icons/md";

interface Props {
  href: string;
  cart: CartListItemData;
  disabled: boolean;
  onClick: (id: string) => void;
}

const CartCard = ({ cart, href, onClick, disabled }: Props) => {
  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
      <Image maxW="200px" asChild>
        <NextImage
          src={noImage}
          objectFit={"cover"}
          alt={`No image for ${cart.id}`}
        />
      </Image>
      <Box>
        <Card.Body>
          <Card.Title mb="2">Cart {cart.id}</Card.Title>

          <DataList.Root orientation="horizontal">
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
        </Card.Body>

        <Card.Footer>
          <ButtonGroup size={"sm"} variant={"subtle"}>
            <Button variant={"subtle"} colorPalette={"blue"} asChild>
              <NextLink href={href}>
                <MdOutlineViewInAr />
                View
              </NextLink>
            </Button>
            <Button
              variant={"subtle"}
              colorPalette={"red"}
              onClick={() => onClick(cart.id)}
              disabled={disabled}
            >
              <MdDeleteOutline />
              Delete
            </Button>
          </ButtonGroup>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default CartCard;
