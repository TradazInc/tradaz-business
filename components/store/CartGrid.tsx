"use client";

import { useCarts } from "@/hooks/cart";
import { GetAllCartsOutputData } from "@/schema/cart";
import { computePath } from "@/utilities/computePath";
import { parseCursorData } from "@/utilities/parsePageData";
import { Button, For, Spinner, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import GridContainer from "../shared/GridContainer";
import CartCard from "./CartCard";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  initialCarts: GetAllCartsOutputData;
  businessId: string | undefined;
}

const CartGrid = ({ initialCarts, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = useCarts(businessId, {
    fallbackData: [initialCarts],
  });
  const { flatData: carts, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );

  // const { trigger, isMutating } = useRemoveCart(businessId);

  // const handleDelete = async (id: string) => {
  //   toaster.promise(trigger(id), {
  //     loading: {
  //       title: "Deleting cart...",
  //       description: "Please wait",
  //     },
  //     success: {
  //       title: "Deletion successful",
  //       description: "Cart has been deleted",
  //     },
  //     error: errorToastOptions,
  //   });
  // };

  return (
    <GridContainer pb={12}>
      <InfiniteScroll
        dataLength={carts.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <For each={carts}>
          {(cart) => (
            <CartCard
              key={cart.id}
              name={cart.couponCode}
              createdAt={new Date(cart.createdAt).toDateString()}
              href={computePath(cart.id)}
            />
          )}
        </For>{" "}
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
          <Text>Expenses unavailable. Retry to continue.</Text>
        </>
      )}
    </GridContainer>
  );
};

export default CartGrid;
