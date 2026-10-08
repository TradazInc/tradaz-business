"use client";

import EmptyPage from "@/components/shared/EmptyPage";
import { toaster } from "@/components/ui/toaster";
import {
  useProductCategories,
  useRemoveProductCategory,
} from "@/hooks/productCategory";
import { GetAllProductCategoryOutputData } from "@/schema/productCategory";
import { errorToastOptions } from "@/utilities/errorToastOptions";
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
  initialCategories: Promise<GetAllProductCategoryOutputData[]>;
  businessId: string | undefined;
}

const ProductCategoryTable = ({ initialCategories, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = useProductCategories(
    businessId,
    { fallbackData: initialCategories },
  );
  const { flatData: productCategories, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveProductCategory(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: { title: "Deleting category...", description: "Please wait" },
      success: {
        title: "Deletion successful",
        description: "Category has been deleted",
      },
      error: errorToastOptions,
    });
  };

  if (data && productCategories.length === 0) {
    return (
      <EmptyPage
        title="No categories found"
        description="Create a product category"
      />
    );
  }

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
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <EditIconButton />
                      <DeleteIconButton
                        onClick={() => handleDelete(productCategory.id)}
                        disabled={isMutating}
                      />
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
          <Text>Categories unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default ProductCategoryTable;
