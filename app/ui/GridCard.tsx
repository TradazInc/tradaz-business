import {
  Card,
  Heading,
  HStack,
  Icon,
  Image,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LuBoxes } from "react-icons/lu";

interface Props {
  logo?: string | null;
  name: string;
  address?: string;
  createdAt?: string;
  href: string;
}

const GridCard = ({ logo, name, address, createdAt, href }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <HStack gap={"1.5"}>
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
      <Card.Footer>
        <VStack alignItems={"flex-start"} w={"full"}>
          <Text
            color={"fg.muted"}
            textStyle={"sm"}
            textAlign={"start"}
            w={"full"}
          >
            {address}
          </Text>
          <Text
            color={"fg.muted"}
            textStyle={"sm"}
            textAlign={"start"}
            w={"full"}
          >
            {createdAt}
          </Text>
        </VStack>
      </Card.Footer>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default GridCard;
