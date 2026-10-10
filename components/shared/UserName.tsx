"use client";

import { useSession } from "@/hooks/session";
import { Skeleton, Text } from "@chakra-ui/react";

const UserName = () => {
  const { data: session, isLoading } = useSession();

  return (
    <Skeleton
      loading={isLoading}
      h={isLoading ? 10 : "auto"}
      w={isLoading ? 100 : "auto"}
    >
      <Text>Hi {session?.user.name}</Text>
    </Skeleton>
  );
};

export default UserName;
