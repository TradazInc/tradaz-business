"use client";

import { usePointsConfigs } from "@/hooks/pointsConfig";
import { GetAllPointsConfigOutputData } from "@/schema/pointsConfig";
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

import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  initialPointsConfigs: GetAllPointsConfigOutputData;
  businessId: string | undefined;
}

const PointsConfigTable = ({ initialPointsConfigs, businessId }: Props) => {
  const { data, error, mutate, setSize, size } = usePointsConfigs(businessId, {
    fallbackData: [initialPointsConfigs],
  });
  const { flatData: pointsConfigs, hasMore } = useMemo(
    () => parseCursorData(data),
    [data],
  );
  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={pointsConfigs.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Min Order Value</Table.ColumnHeader>
              <Table.ColumnHeader>Max Order Value</Table.ColumnHeader>
              <Table.ColumnHeader>Reward Percentage</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={pointsConfigs}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={5}>
                    No points configs available
                  </Table.Cell>
                </Table.Row>
              }
            >
              {(pointsConfig) => (
                <Table.Row key={pointsConfig.id} w={"full"}>
                  <Table.Cell>{pointsConfig.name}</Table.Cell>
                  <Table.Cell>{pointsConfig.minOrderValue}</Table.Cell>
                  <Table.Cell>{pointsConfig.maxOrderValue}</Table.Cell>
                  <Table.Cell>{pointsConfig.rewardPercentage}</Table.Cell>
                  <Table.Cell textAlign="end">
                    {/* the API has no delete route for points configs */}
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton>
                        <AiOutlineEdit />
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
          <Text>Points configs unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default PointsConfigTable;
