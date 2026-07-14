"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  icon?: React.ReactNode;
  signup?: string;
  children: React.ReactNode;
  prompt: string;
}

export const DialogBox = ({ icon, children, prompt, signup }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  // Track url changes
  useEffect(() => {
    if (signup) setOpen(true);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("signup");
    router.replace(`${pathname}?${params.toString()}`);
  });

  return (
    <Dialog.Root
      size={"lg"}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button variant={"outline"} size={"xs"}>
          {icon}
          {prompt}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Body>{children}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
