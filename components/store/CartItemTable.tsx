"use client";

import { toaster } from "@/components/ui/toaster";
import {
  useAddCartItem,
  useCart,
  useDecrementCartItem,
  useIncrementCartItem,
  useRemoveCartItem,
} from "@/hooks/cart";
import { GetCartOutputData } from "@/schema/cart";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import {
  Box,
  Button,
  For,
  FormatNumber,
  HStack,
  IconButton,
  Spacer,
  Table,
  Text,
} from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import ProductColorBadge from "../shared/ProductColorBadge";
import ProductSearch from "../shared/ProductSearch";
import TotalPriceStat from "./TotalPriceStat";

interface Props {
  cart: GetCartOutputData;
  businessId: string | undefined;
  storeId: string | undefined;
}

const CartItemTable = ({ cart, businessId, storeId }: Props) => {
  const { data, error, mutate } = useCart(cart.id, { fallbackData: cart });
  const addToCart = useAddCartItem(businessId);
  const removeFromCart = useRemoveCartItem(businessId);
  const incrementItem = useIncrementCartItem(businessId);
  const decrementItem = useDecrementCartItem(businessId);

  const handleDeleteItem = async (id: string) => {
    toaster.promise(removeFromCart.trigger(id), {
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

  const handleAddItem = async (id: string) => {
    toaster.promise(
      addToCart.trigger({ variationId: id, cartId: cart.id, quantity: 1 }),
      {
        loading: {
          title: "Adding cart item...",
          description: "Please wait",
        },
        success: {
          title: "Addition successful",
          description: "Cart item has been added",
        },
        error: errorToastOptions,
      },
    );
  };

  return (
    <Box w={"full"} gapY={3}>
      <HStack w={"full"}>
        <ProductSearch
          searchField={"search"}
          businessId={businessId}
          placeholder={"Search for a product"}
          onSelect={(item) => handleAddItem(item.id)}
        />
        <Spacer />
      </HStack>

      <TotalPriceStat
        totalPrice={
          cart.cartItems.reduce((total, item) => total + item.totalPrice, 0) -
          (cart.depositAmount ?? 0)
        }
      />

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
                <Table.Cell colSpan={7}>No cart items available</Table.Cell>
              </Table.Row>
            }
          >
            {(cartItem) => (
              <Table.Row key={cartItem.id} w={"full"}>
                <Table.Cell>{cartItem.variation.product.name}</Table.Cell>
                <Table.Cell>{cartItem.variation.size?.value}</Table.Cell>
                <Table.Cell>
                  <ProductColorBadge color={cartItem.variation.color} />
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={2}>
                    <IconButton
                      size={"xs"}
                      onClick={() => incrementItem.trigger(cartItem.id)}
                      disabled={incrementItem.isMutating}
                    >
                      <LuPlus />
                    </IconButton>
                    {cartItem.quantity}
                    <IconButton
                      size={"xs"}
                      onClick={() => decrementItem.trigger(cartItem.id)}
                      disabled={decrementItem.isMutating}
                    >
                      <LuMinus />
                    </IconButton>
                  </HStack>
                </Table.Cell>
                <Table.Cell>
                  <FormatNumber
                    value={cartItem.totalPrice}
                    style={"currency"}
                    currency={"NGN"}
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
                    onClick={() => handleDeleteItem(cartItem.id)}
                    disabled={removeFromCart.isMutating}
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
