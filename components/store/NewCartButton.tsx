"use client";

import { useAddCart } from "@/hooks/cart";
import { computePath } from "@/utilities/computePath";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";

interface Props {
  businessId: string | undefined;
  storeId: string | undefined;
}

const NewCartButton = ({
  businessId,
  storeId,
  ...props
}: Props & ButtonProps) => {
  const { push } = useRouter();
  const { trigger } = useAddCart(businessId);

  const handleClick = async () => {
    const { id } = await trigger({});
    push(`${computePath(businessId, storeId)}/carts/${id}`);
  };

  return (
    <Button variant={"outline"} size={"xs"} {...props} onClick={handleClick}>
      <LuPlus />
      New Cart
    </Button>
  );
};

export default NewCartButton;
