"use client";

import { toaster } from "@/components/ui/toaster";
import { FetchResponse } from "@/lib/apiClient";
import { SizeType } from "@/server/entities/sizeType";
import { useRemoveSizeType, useSizeTypes } from "@/server/hooks/sizeType";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePagedData";
import {
  Box,
  Button,
  ButtonGroup,
  For,
  HStack,
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
  initialSizeTypes: FetchResponse<SizeType>;
}

const ProductSizeTable = ({ initialSizeTypes }: Props) => {
  const { data, error, mutate, setSize, size } = useSizeTypes([
    initialSizeTypes,
  ]);
  const { flatData: sizeTypes, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemoveSizeType();

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: { title: "Deleting size type...", description: "Please wait" },
      success: {
        title: "Deletion successful",
        description: "Size type has been deleted",
      },
      error: errorToastOptions,
    });
  };

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={sizeTypes.length}
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
              each={sizeTypes}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={3}>No size types available</Table.Cell>
                </Table.Row>
              }
            >
              {(sizeType) => (
                <Table.Row key={sizeType.id} w={"full"}>
                  <Table.Cell>{sizeType.name}</Table.Cell>
                  <Table.Cell>
                    <HStack gapX={2}>
                      {sizeType.sizes?.map((size) => (
                        <Text key={size.id}>{size.value}</Text>
                      ))}
                    </HStack>
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton>
                        <AiOutlineEdit />
                      </IconButton>
                      <IconButton
                        color={"fg.error"}
                        _hover={{ bg: "bg.error", color: "fg.error" }}
                        onClick={() => handleDelete(sizeType.id)}
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
          <Text>Size types unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default ProductSizeTable;
