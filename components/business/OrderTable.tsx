"use client";

import { toaster } from "@/components/ui/toaster";
import { useOrders, useUpdateOrderStatus } from "@/hooks/order";
import { OrderStatus } from "@/schema/enums";
import {
  GetAllOrderOutputData,
  UpdateOrderStatusInputData,
} from "@/schema/order";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  createListCollection,
  For,
  FormatNumber,
  IconButton,
  Portal,
  Select,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { MdOutlineViewInAr } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  initialOrders: GetAllOrderOutputData;
  businessId: string | undefined;
}

const OrderTable = ({ initialOrders, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = useOrders(businessId, {
    fallbackData: [initialOrders],
  });
  const { flatData: orders, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useUpdateOrderStatus(businessId);

  const statusCollection = createListCollection({
    items: [
      { label: "Cancelled", value: OrderStatus.cancelled },
      { label: "Fulfilled", value: OrderStatus.fulfilled },
      { label: "Paid", value: OrderStatus.paid },
      { label: "Pending", value: OrderStatus.pending },
    ],
  });

  const handleUpdate = async (data: {
    id: string;
    data: UpdateOrderStatusInputData;
  }) => {
    toaster.promise(trigger(data), {
      loading: {
        title: "Updating order status...",
        description: "Please wait",
      },
      success: {
        title: "Update successful",
        description: "Order status has been updated",
      },
      error: errorToastOptions,
    });
  };

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={orders.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Reference</Table.ColumnHeader>
              <Table.ColumnHeader>Total Price</Table.ColumnHeader>
              <Table.ColumnHeader>Paid Price</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={orders}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={10}>No orders available</Table.Cell>
                </Table.Row>
              }
            >
              {(order) => (
                <Table.Row key={order.id} w={"full"}>
                  <Table.Cell>{order.reference}</Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={order.totalPrice}
                      style="currency"
                      currency="NGN"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={order.paidPrice}
                      style="currency"
                      currency="NGN"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Select.Root
                      value={[order.orderStatus]}
                      collection={statusCollection}
                      disabled={
                        order.orderStatus === OrderStatus.fulfilled ||
                        isMutating
                      }
                      onValueChange={({ value }) => {
                        handleUpdate({
                          id: order.id,
                          data: value[0] as OrderStatus,
                        });
                      }}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger>
                          <Select.ValueText placeholder={"Update status"} />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {statusCollection.items.map((status) => (
                              <Select.Item item={status} key={status.value}>
                                {status.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(order.createdAt).toDateString()}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton>
                        <MdOutlineViewInAr />
                      </IconButton>
                    </ButtonGroup>
                  </Table.Cell>
                </Table.Row>
              )}
            </For>
          </Table.Body>
        </Table.Root>
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
          <Text>Orders unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default OrderTable;
