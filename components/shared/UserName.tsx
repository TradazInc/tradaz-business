"use client";

import { useSession } from "@/hooks/session";
import { Skeleton } from "@chakra-ui/react";
import HeaderText from "./HeaderText";

const UserName = () => {
  const { data: session } = useSession();

  return session?.user ? (
    <HeaderText>{`Hi ${session?.user.name}`}</HeaderText>
  ) : (
    <Skeleton h={10} w={250} />
  );
};

export default UserName;
