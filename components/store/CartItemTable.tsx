"use client";

import { toaster } from "@/components/ui/toaster";
import { useCart, useRemoveCartItem } from "@/hooks/cart";
import { GetCartOutputData } from "@/schema/cart";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Button,
  For,
  FormatNumber,
  IconButton,
  Table,
  Text,
} from "@chakra-ui/react";
import { MdDeleteOutline } from "react-icons/md";

interface Props {
  cart: GetCartOutputData;
  businessId: string | undefined;
  storeId: string | undefined;
}

const CartItemTable = ({ cart, businessId, storeId }: Props) => {
  const { data, error, mutate } = useCart(cart.id, { fallbackData: cart });
  const { trigger, isMutating } = useRemoveCartItem(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Deleting cart item...",
        description: "Please wait",
      },
      success: {
        title: "Deletion successful",
        description: "Cart item has been deleted",
      },
      error: errorToastOptions,
    });
  };
  return (
    <Box w={"full"}>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Size</Table.ColumnHeader>
            <Table.ColumnHeader>Color</Table.ColumnHeader>
            <Table.ColumnHeader>Quantity</Table.ColumnHeader>
            <Table.ColumnHeader>Total Price</Table.ColumnHeader>
            <Table.ColumnHeader>Stock</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <For
            each={data?.cartItems}
            fallback={
              <Table.Row>
                <Table.Cell colSpan={6}>No cart items available</Table.Cell>
              </Table.Row>
            }
          >
            {(cartItem) => (
              <Table.Row key={cartItem.id} w={"full"}>
                <Table.Cell>{cartItem.variation.product.name}</Table.Cell>
                <Table.Cell>{cartItem.variation.size?.value}</Table.Cell>
                <Table.Cell>{cartItem.variation.color}</Table.Cell>
                <Table.Cell>{cartItem.quantity}</Table.Cell>
                <Table.Cell>
                  <FormatNumber
                    value={cartItem.totalPrice}
                    style="currency"
                    currency="NGN"
                  />
                </Table.Cell>
                <Table.Cell>
                  {cartItem.variation.teamVariations.find(
                    (tv) => tv.teamId === storeId,
                  )?.quantity ?? "N/A"}
                </Table.Cell>
                <Table.Cell textAlign="end">
                  <IconButton
                    size="sm"
                    variant="outline"
                    color={"fg.error"}
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                    onClick={() => handleDelete(cartItem.id)}
                    disabled={isMutating}
                  >
                    <MdDeleteOutline />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
      </Table.Root>
      {error && (
        <>
          <Button
            w={"full"}
            size={"md"}
            variant={"subtle"}
            onClick={() => mutate()}
          >
            Click to retry
          </Button>
          <Text w={"full"}>Cart unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default CartItemTable;
