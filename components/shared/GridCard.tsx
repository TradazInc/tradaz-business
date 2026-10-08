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
            <Avatar.Root>
              <Avatar.Image src={logo} />
            </Avatar.Root>
          ) : (
            <Icon p={1} rounded={"full"} size={"2xl"} borderWidth={"1px"}>
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

        <Card.Description my={1}>{address}</Card.Description>

        <HStack>
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
