"use client";

import { toaster } from "@/components/ui/toaster";
import { FetchResponse } from "@/server/entities/fetchResponse";
import { ProductCategory } from "@/server/entities/productCategory";
import {
  useProductCategories,
  useRemoveProductCategory,
} from "@/server/hooks/productCategory";
import { errorOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePagedData";
import {
  Box,
  Button,
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
  initialCategories: FetchResponse<ProductCategory>;
}

const ProductCategoryTable = ({ initialCategories }: Props) => {
  const { data, error, mutate, setSize, size } = useProductCategories([
    initialCategories,
  ]);
  const { flatData: productCategories, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveProductCategory();

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: { title: "Deleting category...", description: "Please wait" },
      success: {
        title: "Deletion successful",
        description: "Category has been deleted",
      },
      error: errorOptions,
    });
  };

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={productCategories.length}
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
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={productCategories}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={3}>No categories available</Table.Cell>
                </Table.Row>
              }
            >
              {(productCategory) => (
                <Table.Row key={productCategory.id} w={"full"}>
                  <Table.Cell>{productCategory.name}</Table.Cell>
                  <Table.Cell>CH</Table.Cell>
                  <Table.Cell textAlign="end" gapX={2}>
                    <IconButton variant={"subtle"}>
                      <AiOutlineEdit />
                    </IconButton>
                    <IconButton
                      variant={"subtle"}
                      color={"fg.error"}
                      _hover={{ bg: "bg.error", color: "fg.error" }}
                      onClick={() => handleDelete(productCategory.id)}
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
          <Text>Categories unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default ProductCategoryTable;
