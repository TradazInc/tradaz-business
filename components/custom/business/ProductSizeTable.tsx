"use client";

import { toaster } from "@/components/ui/toaster";
import { FetchResponse } from "@/server/entities/fetchResponse";
import { SizeType } from "@/server/entities/sizeType";
import { useRemoveSizeType, useSizeTypes } from "@/server/hooks/sizeType";
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
        description: "Size type has been created",
      },
      error: errorOptions,
    });
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
        dataLength={sizeTypes.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
      >
        <Table.Body>
          <For each={sizeTypes} fallback={"No size types available"}>
            {(sizeType) => (
              <Table.Row key={sizeType.id} w={"full"}>
                <Table.Cell>{sizeType.name}</Table.Cell>
                <Table.Cell>XL</Table.Cell>
                <Table.Cell textAlign="end">
                  <IconButton variant={"subtle"}>
                    <AiOutlineEdit />
                  </IconButton>
                  <IconButton
                    variant={"subtle"}
                    color={"fg.error"}
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                    onClick={() => handleDelete(sizeType.id)}
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
            <Text>Size types unavailable. Retry to continue.</Text>
          </>
        )}
      </InfiniteScroll>
    </Table.Root>
  );
};

export default ProductSizeTable;
