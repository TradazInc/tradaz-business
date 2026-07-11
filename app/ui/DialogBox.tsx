import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  icon?: React.ReactNode;
  signup?: string;
  children: React.ReactNode;
  prompt: string;
}

export const DialogBox = ({ icon, children, prompt, signup }: Props) => {
  const [open, setOpen] = useState(false);

  // Track url changes
  useEffect(() => {
    if (signup) setOpen(true);
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
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant={"outline"}>Cancel</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
