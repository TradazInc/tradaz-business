"use client";

import { toaster } from "@/components/ui/toaster";
import { useRemoveRevenue, useRevenues } from "@/hooks/revenue";
import { useStores } from "@/hooks/store";
import { GetAllRevenueOutputData } from "@/schema/revenue";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  For,
  FormatNumber,
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
  initialRevenues: GetAllRevenueOutputData;
  businessId: string | undefined;
}

const RevenueTable = ({ initialRevenues, businessId }: Props) => {
  const { data: stores } = useStores(businessId);
  const { data, error, mutate, setSize, size } = useRevenues(businessId, {
    fallbackData: [initialRevenues],
  });
  const { flatData: revenues, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveRevenue(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Deleting revenue...",
        description: "Please wait",
      },
      success: {
        title: "Deletion successful",
        description: "Revenue has been deleted",
      },
      error: errorToastOptions,
    });
  };
  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={revenues.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
              <Table.ColumnHeader>Amount</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader>Store</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={revenues}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={6}>No revenue available</Table.Cell>
                </Table.Row>
              }
            >
              {(revenue) => (
                <Table.Row key={revenue.id} w={"full"}>
                  <Table.Cell>{revenue.name}</Table.Cell>
                  <Table.Cell>{revenue.description}</Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={revenue.amount}
                      style="currency"
                      currency="NGN"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(revenue.createdAt).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {revenue.teamId
                      ? (stores?.find((s) => s.id === revenue.teamId)?.name ??
                        "-")
                      : "-"}
                  </Table.Cell>{" "}
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton>
                        <AiOutlineEdit />
                      </IconButton>
                      <IconButton
                        color={"fg.error"}
                        _hover={{ bg: "bg.error", color: "fg.error" }}
                        onClick={() => handleDelete(revenue.id)}
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
          <Text>Revenues unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default RevenueTable;
