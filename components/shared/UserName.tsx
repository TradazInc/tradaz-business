"use client";

import { useSession } from "@/hooks/session";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

const UserName = () => {
  const { data: session, isLoading } = useSession();

  return (
    <Skeleton
      loading={isLoading}
      h={isLoading ? 10 : "auto"}
      w={isLoading ? 150 : "auto"}
    >
      <HeaderText>{`Hi ${session?.user.name}`}</HeaderText>
    </Skeleton>
  );
};

export default UserName;
