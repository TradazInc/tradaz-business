"use client";

import { useCart } from "@/hooks/cart";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  cartId: string;
  businessId: string | undefined;
  storeId: string | undefined;
}

const CartName = ({ cartId, businessId, storeId }: Props) => {
  const { data: cart } = useCart(cartId, businessId, storeId);

  return cart ? (
    <HeaderText>{`Cart ${cart.id}`}</HeaderText>
  ) : (
    <Skeleton h={10} w={250} />
  );
};

export default CartName;
