"use client";

import { Button, Presence, Stack, useDisclosure } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface Props {
  initial?: React.ReactNode;
  children: React.ReactNode;
}

export const ShowMore = ({ children, initial }: Props) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={4} w={"full"}>
      <Button
        size={"xs"}
        variant={"outline"}
        alignSelf={"flex-end"}
        onClick={onToggle}
      >
        {open ? <LuChevronUp /> : <LuChevronDown />}
        {open ? "Show less" : "Show more"}
      </Button>
      {initial}
      <Presence
        w={"full"}
        present={open}
        animationName={{
          _open: "slide-from-bottom, fade-in",
          _closed: "slide-to-bottom, fade-out",
        }}
        animationDuration="moderate"
      >
        {children}
      </Presence>
    </Stack>
  );
};
