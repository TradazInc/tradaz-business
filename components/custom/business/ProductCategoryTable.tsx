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
  Button,
  For,
  IconButton,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
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
  const { refresh } = useRouter();

  const handleDelete = async (id: string) => {
    const promise = toaster.promise(trigger(id), {
      loading: { title: "Deleting category...", description: "Please wait" },
      success: {
        title: "Deletion successful",
        description: "Category has been created",
      },
      error: errorOptions,
    });
    if (!promise) return;
    try {
      await promise.unwrap();
      refresh();
    } catch {
      /* Toast handled by the `error` option */
    }
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Code</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <InfiniteScroll
        dataLength={productCategories.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
      >
        <Table.Body>
          <For each={productCategories} fallback={"No categories available"}>
            {(productCategories) => (
              <Table.Row key={productCategories.id}>
                <Table.Cell>{productCategories.name}</Table.Cell>
                <Table.Cell>CH</Table.Cell>
                <Table.Cell textAlign="end">
                  <IconButton>
                    <AiOutlineEdit />
                  </IconButton>
                  <IconButton
                    color={"fg.error"}
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                    onClick={() => handleDelete(productCategories.id)}
                    disabled={isMutating}
                  >
                    <MdDeleteOutline />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            )}
          </For>
        </Table.Body>
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
            <Text>"Categories unavailable. Retry to continue."</Text>
          </>
        )}
      </InfiniteScroll>
    </Table.Root>
  );
};

export default ProductCategoryTable;
