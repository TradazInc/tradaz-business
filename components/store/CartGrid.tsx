"use client";

import { useCarts, useRemoveCart } from "@/hooks/cart";
import { GetAllCartsOutputData } from "@/schema/cart";
import { computePath } from "@/utilities/computePath";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import { Button, For, Spinner, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GridContainer from "../shared/GridContainer";
import { toaster } from "../ui/toaster";
import CartCard from "./CartCard";

interface Props {
  initialCarts: GetAllCartsOutputData;
  businessId: string | undefined;
  storeId: string | undefined;
}

const CartGrid = ({ initialCarts, businessId, storeId }: Props) => {
  const { data, error, mutate, setSize, size } = useCarts(businessId, {
    fallbackData: [initialCarts],
  });
  const { flatData: carts, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );

  const { trigger, isMutating } = useRemoveCart(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Deleting cart...",
        description: "Please wait",
      },
      success: {
        title: "Deletion successful",
        description: "Cart has been deleted",
      },
      error: errorToastOptions,
    });
  };

  return (
    <GridContainer pb={12} columns={1}>
      <InfiniteScroll
        dataLength={carts.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <For each={carts}>
          {(cart, index) => (
            <CartCard
              key={cart.id}
              cart={cart}
              onClick={handleDelete}
              disabled={isMutating}
              href={`${computePath(businessId, storeId)}/cart/${cart.id}`}
            />
          )}
        </For>
      </InfiniteScroll>
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
          <Text>Carts unavailable. Retry to continue.</Text>
        </>
      )}
    </GridContainer>
  );
};

export default CartGrid;
