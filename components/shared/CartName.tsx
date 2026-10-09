"use client";

import { useCart } from "@/hooks/cart";
import { Skeleton, Text } from "@chakra-ui/react";

interface Props {
  cartId: string;
}

const CartName = ({ cartId }: Props) => {
  const { data: cart } = useCart(cartId);

  return (
    <Text>{cart ? `Cart ${cart.id}` : <Skeleton w={"160px"} h={10} />}</Text>
  );
};

export default CartName;
