"use client";

import { Button, Presence, Stack, useDisclosure } from "@chakra-ui/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

interface Props {
  children: React.ReactNode;
}

export const ShowMore = ({ children }: Props) => {
  const { open, onToggle } = useDisclosure();

  return (
    <Stack gap={4}>
      <Button
        size={"sm"}
        variant={"outline"}
        alignSelf={"flex-end"}
        onClick={onToggle}
      >
        {open ? <LuChevronUp /> : <LuChevronDown />}
        {open ? "Show less" : "Show more"}
      </Button>
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
