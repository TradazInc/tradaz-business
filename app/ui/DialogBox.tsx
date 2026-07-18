"use client";

import { Button, Dialog, Portal } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  signup?: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const DialogBox = ({ children, trigger, signup }: Props) => {
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
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
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
