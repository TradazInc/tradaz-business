"use client";

import { toaster } from "@/components/ui/toaster";
import { Coupon } from "@/entities/coupons";
import { useCoupons, useRemoveCoupon } from "@/hooks/coupon";
import { FetchResponse } from "@/lib/apiClient";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  For,
  IconButton,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  initialCoupons: FetchResponse<Coupon>;
  businessId: string | undefined;
}

const CouponTable = ({ initialCoupons, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = useCoupons(businessId, {
    fallbackData: [initialCoupons],
  });
  const { flatData: coupons, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveCoupon(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Deleting coupon...",
        description: "Please wait",
      },
      success: {
        title: "Deletion successful",
        description: "Coupon has been deleted",
      },
      error: errorToastOptions,
    });
  };
  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={coupons.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Code</Table.ColumnHeader>
              <Table.ColumnHeader>Discount Type</Table.ColumnHeader>
              <Table.ColumnHeader>Discount Value</Table.ColumnHeader>
              <Table.ColumnHeader>Mininum Order Value</Table.ColumnHeader>
              <Table.ColumnHeader>Usage Limit</Table.ColumnHeader>
              <Table.ColumnHeader>Active</Table.ColumnHeader>
              <Table.ColumnHeader>Start Date</Table.ColumnHeader>
              <Table.ColumnHeader>End Date</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={coupons}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={10}>No coupons available</Table.Cell>
                </Table.Row>
              }
            >
              {(coupon) => (
                <Table.Row key={coupon.id} w={"full"}>
                  <Table.Cell>{coupon.name}</Table.Cell>
                  <Table.Cell>{coupon.code}</Table.Cell>
                  <Table.Cell>{coupon.discountType}</Table.Cell>
                  <Table.Cell>{coupon.discountValue}</Table.Cell>
                  <Table.Cell>{coupon.minOrderValue}</Table.Cell>
                  <Table.Cell>{coupon.usageLimit}</Table.Cell>
                  <Table.Cell>{coupon.isActive}</Table.Cell>
                  <Table.Cell>
                    {coupon?.startsAt
                      ? new Date(coupon.startsAt).toDateString()
                      : "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {coupon?.endsAt
                      ? new Date(coupon.endsAt).toDateString()
                      : "-"}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton>
                        <AiOutlineEdit />
                      </IconButton>
                      <IconButton
                        color={"fg.error"}
                        _hover={{ bg: "bg.error", color: "fg.error" }}
                        onClick={() => handleDelete(coupon.id)}
                        disabled={isMutating}
                      >
                        <MdDeleteOutline />
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
          <Text>Coupons unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default CouponTable;
