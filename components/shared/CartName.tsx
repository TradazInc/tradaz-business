"use client";

import { useCart } from "@/hooks/cart";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

interface Props {
  cartId: string;
}

const CartName = ({ cartId }: Props) => {
  const { data: cart, isLoading } = useCart(cartId);

  return (
    <Skeleton
      loading={isLoading}
      h={isLoading ? 10 : "auto"}
      w={isLoading ? 150 : "auto"}
    >
      <HeaderText>{`Cart ${cart?.id}`}</HeaderText>
    </Skeleton>
  );
};

export default CartName;
