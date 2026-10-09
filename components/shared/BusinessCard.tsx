import { GetBusinessOutputData } from "@/schema/business";
import {
  Avatar,
  Badge,
  Card,
  HStack,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HiBuildingOffice2 } from "react-icons/hi2";

interface Props {
  business: GetBusinessOutputData;
  badgeItems: (string | undefined)[];
  href: string;
}

const BusinessCard = ({ business, href, badgeItems }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Body gap={0}>
        <HStack gap={3}>
          <Avatar.Root variant={"outline"}>
            <Avatar.Image src={business.logo ?? undefined} />
            <Avatar.Fallback>
              <HiBuildingOffice2 />
            </Avatar.Fallback>
          </Avatar.Root>
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
