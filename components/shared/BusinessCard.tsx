import { GetBusinessOutputData } from "@/schema/business";
import {
  Avatar,
  Card,
  HStack,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import NextLink from "next/link";
import { HiBuildingOffice2 } from "react-icons/hi2";
import BadgeList from "./BadgeList";

interface Props {
  business: GetBusinessOutputData;
  href: string;
}

const BusinessCard = ({ business, href }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Body asChild>
        <HStack gap={3}>
          <Avatar.Root variant={"outline"} size={"lg"}>
            <Avatar.Image src={business.logo ?? undefined} />
            <Avatar.Fallback>
              <HiBuildingOffice2 />
            </Avatar.Fallback>
          </Avatar.Root>

          <Stack>
            <HStack justifyContent={"flex-start"} gap={0.5}>
              <Text fontWeight={"semibold"} textStyle={"sm"}>
                {business.name}
              </Text>
              {business.slug && (
                <Text color={"fg.muted"} textStyle={"sm"}>
                  @{business.slug}
                </Text>
              )}
            </HStack>

            <Card.Description>
              {JSON.parse(business.metadata)?.address}
            </Card.Description>

            <BadgeList
              items={[
                business.category?.name,
                format(business.createdAt, "dd MMM yy").toUpperCase(),
              ]}
            />
          </Stack>
        </HStack>
      </Card.Body>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default BusinessCard;
