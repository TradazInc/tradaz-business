import {
  Avatar,
  Badge,
  Card,
  HStack,
  Icon,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MdBusiness } from "react-icons/md";

interface Props {
  logo?: string | null;
  name: string;
  slug?: string;
  address?: string;
  badgeItems: (string | undefined)[];
  href: string;
}

const GridCard = ({ logo, name, slug, address, href, badgeItems }: Props) => {
  return (
    <Card.Root size={"sm"} flexDirection={"row"}>
      <Card.Body gap={0}>
        <HStack gap={3}>
          {logo ? (
            <Avatar.Root size={"xl"}>
              <Avatar.Image src={logo} />
            </Avatar.Root>
          ) : (
            <Icon size={"xl"} rounded={"full"} bg={"bg"}>
              <MdBusiness />
            </Icon>
          )}
          <Stack gap={0}>
            <Text fontWeight={"semibold"} textStyle={"sm"}>
              {name}
            </Text>
            {slug && (
              <Text color={"fg.muted"} textStyle={"sm"}>
                @{slug}
              </Text>
            )}
          </Stack>
        </HStack>
        <Card.Description>{address}</Card.Description>
        <HStack mt={4}>
          {badgeItems.filter(Boolean).map((item) => (
            <Badge>{item}</Badge>
          ))}
        </HStack>
      </Card.Body>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default GridCard;
