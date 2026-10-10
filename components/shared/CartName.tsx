"use client";

import { useCart } from "@/hooks/cart";
import { Skeleton, Text } from "@chakra-ui/react";

interface Props {
  cartId: string;
}

const CartName = ({ cartId }: Props) => {
  const { data: cart, isLoading } = useCart(cartId);

  return (
    <Skeleton w={40} h={10} loading={isLoading}>
      <Text>{`Cart ${cart?.id}`}</Text>
    </Skeleton>
  );
};

export default CartName;
