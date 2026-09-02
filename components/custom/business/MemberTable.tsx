"use client";

import { toaster } from "@/components/ui/toaster";
import { Member } from "@/entities/member";
import { useMembers, useRemoveMember } from "@/hooks/member";
import { FetchResponse } from "@/lib/apiClient";
import { errorToastOptions } from "@/utilities/errorToastOptions";
import { parseIndexData } from "@/utilities/parsePageData";
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
import { MdDeleteOutline } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
  initialMembers: FetchResponse<Member>;
  businessId: string | undefined;
}
const MemberTable = ({ businessId, initialMembers }: Props) => {
  const { data, error, mutate, setSize, size } = useMembers(businessId, {
    fallbackData: [initialMembers],
  });
  const { flatData: members, hasMore } = useMemo(
    () => parseIndexData(data),
    [data],
  );

  const { trigger, isMutating } = useRemoveMember(businessId);

  const handleDelete = async (id: string) => {
    toaster.promise(trigger(id), {
      loading: {
        title: "Removing member...",
        description: "Please wait",
      },
      success: {
        title: "Removal successful",
        description: "Member has been removed",
      },
      error: errorToastOptions,
    });
  };

  return (
    <Box w={"full"}>
      <InfiniteScroll
        dataLength={members.length}
        next={() => setSize(size + 1)}
        hasMore={hasMore && !error}
        loader={<Spinner />}
        style={{ width: "100%", overflow: "visible" }}
      >
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader>Role</Table.ColumnHeader>
              <Table.ColumnHeader>Joined</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <For
              each={members}
              fallback={
                <Table.Row>
                  <Table.Cell colSpan={5}>No members available</Table.Cell>
                </Table.Row>
              }
            >
              {(member) => (
                <Table.Row key={member.id} w={"full"}>
                  <Table.Cell>{member.user.name}</Table.Cell>
                  <Table.Cell>{member.user.email}</Table.Cell>
                  <Table.Cell>{member.role}</Table.Cell>
                  <Table.Cell>
                    {new Date(member.createdAt).toDateString()}
                  </Table.Cell>
                  <Table.Cell textAlign="end">
                    <ButtonGroup size="sm" variant="outline">
                      <IconButton>
                        <AiOutlineEdit />
                      </IconButton>
                      <IconButton
                        color={"fg.error"}
                        _hover={{ bg: "bg.error", color: "fg.error" }}
                        onClick={() => handleDelete(member.id)}
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
          <Text>Members unavailable. Retry to continue.</Text>
        </>
      )}
    </Box>
  );
};

export default MemberTable;
