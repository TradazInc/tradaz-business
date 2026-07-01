import { Card, HStack, Icon, Image, Stack, Text } from "@chakra-ui/react";
import { LuBoxes } from "react-icons/lu";

interface Props {
  logo?: string | null;
  name: string;
  description?: string;
  address?: string;
  createdAt?: string;
}

const GridCard = ({ logo, name, address, description, createdAt }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Body>
        <HStack gap="3">
          <Icon
            size={"xl"}
            rounded={"full"}
            bg={"bg"}
            contain={"content"}
            p={1}
          >
            {logo ? (
              <Image src={logo} borderRadius={"full"} fit={"cover"} />
            ) : (
              <LuBoxes />
            )}
          </Icon>
          <Stack gap="0">
            <Text fontWeight="semibold" textStyle="sm">
              {name}
            </Text>
            <Text color="fg.muted" textStyle="sm">
              {address} {createdAt}
            </Text>
          </Stack>
        </HStack>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
    </Card.Root>
  );
};

export default GridCard;
