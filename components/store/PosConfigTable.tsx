"use client";

import EmptyPage from "@/components/shared/EmptyPage";
import { toaster } from "@/components/ui/toaster";
import { usePosConfigs, useRemovePosConfig } from "@/hooks/posConfig";
import { useStores } from "@/hooks/store";
import { GetAllPosConfigOutputData } from "@/schema/posConfig";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseCursorData } from "@/utilities/parsePageData";
import {
  Box,
  Button,
  ButtonGroup,
  For,
  Menu,
  Portal,
  Spinner,
  Table,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { HiCog } from "react-icons/hi";
import InfiniteScroll from "react-infinite-scroll-component";
import DeleteIconButton from "../shared/DeleteIconButton";
import EditIconButton from "../shared/EditIconButton";

interface Props {
  initialPosConfigs: Promise<GetAllPosConfigOutputData[]>;
  businessId: string | undefined;
}

const PosConfigTable = ({ initialPosConfigs, businessId }: Props) => {
  const { data: stores } = useStores(businessId);
  const { data, error, mutate, setSize, size } = usePosConfigs(businessId, {
    fallbackData: initialPosConfigs,
  });
  const { flatData: posConfigs, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  const { trigger, isMutating } = useRemovePosConfig(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: { title: "Deleting pos config...", description: "Please wait" },
      success: {
        title: "Deletion successful",
        description: "Pos config has been deleted",
      },
      error: errorToastOptions,
    });
  };

  if (data && posConfigs.length === 0) {
    return (
      <EmptyPage
        title="No configurations found"
        description="Create a POS configuration"
      />
    );
  }

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={posConfigs.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Gateway</Table.ColumnHeader>
              <Table.ColumnHeader>Terminals</Table.ColumnHeader>
              <Table.ColumnHeader>Merchant ID</Table.ColumnHeader>
              <Table.ColumnHeader>Private Key</Table.ColumnHeader>
              <Table.ColumnHeader>Store</Table.ColumnHeader>
              <Table.ColumnHeader>Created At</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={posConfigs}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={7}>No pos configs available</Table.Cell>
                </Table.Row>
              }
            >
              {(posConfig) => (
                <Table.Row key={posConfig.id} w={"full"}>
                  <Table.Cell>{posConfig.gateway}</Table.Cell>
                  <Table.Cell>
                    <Menu.Root>
                      <Menu.Trigger asChild>
                        <Button variant={"outline"} size={"sm"}>
                          <HiCog /> Terminals
                        </Button>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            {posConfig.terminalConfigs?.map((terminal) => (
                              <Menu.Item key={terminal.id} value={terminal.id}>
                                {terminal.name ?? terminal.serialNumber}
                              </Menu.Item>
                            ))}
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </Table.Cell>
                  <Table.Cell>{posConfig.merchantId ?? "-"}</Table.Cell>
                  <Table.Cell>{posConfig.privateKey}</Table.Cell>
                  <Table.Cell>
                    {stores?.find((s) => s.id === posConfig.teamId)?.name ??
                      "-"}
                  </Table.Cell>
                  <Table.Cell>
                    {new Date(posConfig.createdAt).toDateString()}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <EditIconButton />
                      <DeleteIconButton
                        onClick={() => handleDelete(posConfig.id)}
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
          <Text>Pos configs unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default PosConfigTable;
