import {
  Card,
  Heading,
  HStack,
  Icon,
  Image,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LuBoxes } from "react-icons/lu";

interface Props {
  logo?: string | null;
  name: string;
  description?: string;
  address?: string;
  createdAt?: string;
  href: string;
}

const GridCard = ({
  logo,
  name,
  address,
  description,
  createdAt,
  href,
}: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <HStack gap={"3"}>
          <Icon
            p={1}
            bg={"bg"}
            size={"xl"}
            rounded={"full"}
            contain={"content"}
          >
            {logo ? (
              <Image src={logo} borderRadius={"full"} fit={"cover"} />
            ) : (
              <LuBoxes />
            )}
          </Icon>
          <Heading size={"sm"}>{name}</Heading>
        </HStack>
      </Card.Header>
      <Card.Body>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Stack justifyContent={"flex-start"}>
          <Text color="fg.muted" textStyle={"sm"}>
            {address}
          </Text>
          <Text color="fg.muted" textStyle={"sm"}>
            {createdAt}
          </Text>
        </Stack>
      </Card.Footer>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default GridCard;
