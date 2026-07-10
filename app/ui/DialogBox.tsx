import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Icon,
  Portal,
} from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  icon?: IconType;
  children: React.ReactNode;
  prompt: string;
}

export const DialogBox = ({ icon, children, prompt }: Props) => {
  return (
    <HStack>
      <Dialog.Root size={"lg"}>
        <Dialog.Trigger asChild>
          <Button variant={"outline"} size={"xs"}>
            {icon && <Icon as={icon} />}
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
