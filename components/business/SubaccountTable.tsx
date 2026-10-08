"use client";

import EmptyPage from "@/components/shared/EmptyPage";
import { useSubaccounts } from "@/hooks/subaccount";
import { GetAllSubaccountOutputData } from "@/schema/subaccount";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  For,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteIconButton from "../shared/DeleteIconButton";
import EditIconButton from "../shared/EditIconButton";

interface Props {
  initialSubaccounts: Promise<GetAllSubaccountOutputData[]>;
  businessId: string | undefined;
}

const SubaccountTable = ({ initialSubaccounts, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = useSubaccounts(businessId, {
    fallbackData: initialSubaccounts,
  });
  const { flatData: subaccounts, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );

  if (data && subaccounts.length === 0) {
    return (
      <EmptyPage
        title="No subaccount found"
        description="Add a subaccount to receive payments"
      />
    );
  }

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={subaccounts.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Gateway</Table.ColumnHeader>
              <Table.ColumnHeader>Subaccount Id</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={subaccounts}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={4}>No subaccount available</Table.Cell>
                </Table.Row>
              }
            >
              {(subaccount) => (
                <Table.Row key={subaccount.id} w={"full"}>
                  <Table.Cell>{subaccount.gateway}</Table.Cell>
                  <Table.Cell>{subaccount.subAccountId}</Table.Cell>
                  <Table.Cell>{subaccount.createdAt}</Table.Cell>

                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <EditIconButton />
                      <DeleteIconButton />
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
          <Text>Subaccounts unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default SubaccountTable;
