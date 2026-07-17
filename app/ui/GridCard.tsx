import { Card, Icon, Image, LinkOverlay, Stack, Text } from "@chakra-ui/react";
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
        <Card.Title gap="3" flexDirection={"row"}>
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
          <Text fontWeight="semibold" textStyle="sm">
            {name}
          </Text>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Stack gap="0" justifyContent={"flex-start"}>
          <Text color="fg.muted" textStyle="sm">
            {address}
          </Text>
          <Text color="fg.muted" textStyle="sm">
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
