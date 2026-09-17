"use client";

import { toaster } from "@/components/ui/toaster";
import { useExpenses, useRemoveExpense } from "@/hooks/expense";
import { useStores } from "@/hooks/store";
import { GetAllExpenseOutputData } from "@/schema/expense";
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
  initialExpenses: GetAllExpenseOutputData;
  businessId: string | undefined;
}

const ExpenseTable = ({ initialExpenses, businessId }: Props) => {
  const { data: stores } = useStores(businessId);
  const { data, error, mutate, setSize, size } = useExpenses(businessId, {
    fallbackData: [initialExpenses],
  });
  const { flatData: expenses, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveExpense(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Deleting expense...",
        description: "Please wait",
      },
      success: {
        title: "Deletion successful",
        description: "Expense has been deleted",
      },
      error: errorToastOptions,
    });
  };
  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={expenses.length}
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
              each={expenses}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={6}>No expenses available</Table.Cell>
                </Table.Row>
              }
            >
              {(expense) => (
                <Table.Row key={expense.id} w={"full"}>
                  <Table.Cell>{expense.name}</Table.Cell>
                  <Table.Cell>{expense.description}</Table.Cell>
                  <Table.Cell>
                    <FormatNumber
                      value={expense.amount}
                      style="currency"
                      currency="NGN"
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(expense.createdAt).toDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {expense.teamId
                      ? (stores?.find((s) => s.id === expense.teamId)?.name ??
                        "-")
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
                        onClick={() => handleDelete(expense.id)}
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
          <Text>Expenses unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default ExpenseTable;
