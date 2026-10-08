import { GetBusinessOutputData } from "@/schema/business";
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
import { IoIosBusiness } from "react-icons/io";

interface Props {
  business: GetBusinessOutputData;
  badgeItems: (string | undefined)[];
  href: string;
}

const BusinessCard = ({ business, href, badgeItems }: Props) => {
  return (
    <Card.Root size={"sm"} flexDirection={"row"}>
      <Card.Body gap={0}>
        <HStack gap={3}>
          {business.logo ? (
            <Avatar.Root>
              <Avatar.Image src={business.logo} />
            </Avatar.Root>
          ) : (
            <Icon p={1.5} rounded={"full"} size={"2xl"} borderWidth={"1px"}>
              <IoIosBusiness />
            </Icon>
          )}
          <Stack gap={0}>
            <Text fontWeight={"semibold"} textStyle={"sm"}>
              {business.name}
            </Text>
            {business.slug && (
              <Text color={"fg.muted"} textStyle={"sm"}>
                @{business.slug}
              </Text>
            )}
          </Stack>
        </HStack>

        <Card.Description my={1.5}>
          {JSON.parse(business.metadata)?.address}
        </Card.Description>

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

export default BusinessCard;
