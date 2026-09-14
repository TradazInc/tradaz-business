import { Dialog, Portal } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  trigger: React.ReactNode;
}

export const DialogBox = ({ children, trigger }: Props) => {
  return (
    <Dialog.Root size={"lg"} lazyMount>
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
