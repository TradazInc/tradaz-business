"use client";

import { useCart } from "@/hooks/cart";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  cartId: string;
}

const CartName = ({ cartId }: Props) => {
  const { data: cart } = useCart(cartId);

  return cart ? (
    <HeaderText>{`Cart ${cart.id}`}</HeaderText>
  ) : (
    <Skeleton h={10} w={250} />
  );
};

export default CartName;
