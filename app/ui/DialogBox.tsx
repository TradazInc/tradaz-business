import { Button, CloseButton, Dialog, HStack, Portal } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";

export const DialogBox = ({
  children,
  prompt,
}: {
  children: React.ReactNode;
  prompt: string;
}) => {
  return (
    <HStack>
      <Dialog.Root size={"lg"}>
        <Dialog.Trigger asChild>
          <Button variant={"outline"} size={"xs"}>
            <LuPlus />
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
    </HStack>
  );
};
