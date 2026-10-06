"use client";

import { useAddCart } from "@/hooks/cart";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
import { toaster } from "../ui/toaster";

interface Props {
  businessId: string | undefined;
  storeId: string | undefined;
}

const NewCartButton = ({
  businessId,
  storeId,
  ...props
}: Props & ButtonProps) => {
  const { push, refresh } = useRouter();
  const { trigger } = useAddCart(businessId);

  const handleClick = async () => {
    const promise = toaster.promise(trigger({}), {
      loading: {
        title: "Creating cart...",
        description: "Please wait",
      },
      success: {
        title: "Creation successful",
        description: "Cart has been created",
      },
      error: errorToastOptions,
    });
    if (!promise) return;
    try {
      const cart = await promise.unwrap();
      refresh();
      push(`${computePath(businessId, storeId)}/carts/${cart.id}`);
    } catch {} // Error displayed by toaster
  };

  return (
    <Button variant={"outline"} size={"xs"} {...props} onClick={handleClick}>
      <LuPlus />
      New Cart
    </Button>
  );
};

export default NewCartButton;
