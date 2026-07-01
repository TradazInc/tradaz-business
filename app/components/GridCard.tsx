import {
  Card,
  HStack,
  Icon,
  Image,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { LuBoxes } from "react-icons/lu";
import NextLink from "next/link";

interface Props {
  id: string;
  logo?: string | null;
  name: string;
  description?: string;
  address?: string;
  createdAt?: string;
  href: string;
}

const GridCard = ({
  id,
  logo,
  name,
  address,
  description,
  createdAt,
  href,
}: Props) => {
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

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default GridCard;
