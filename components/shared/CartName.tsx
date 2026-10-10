"use client";

import { useCart } from "@/hooks/cart";
import { Skeleton, Text } from "@chakra-ui/react";

interface Props {
  cartId: string;
}

const CartName = ({ cartId }: Props) => {
  const { data: cart, isLoading } = useCart(cartId);

  return (
    <Skeleton
      loading={isLoading}
      h={isLoading ? 10 : "auto"}
      w={isLoading ? 100 : "auto"}
    >
      <Text>{`Cart ${cart?.id}`}</Text>
    </Skeleton>
  );
};

export default CartName;
