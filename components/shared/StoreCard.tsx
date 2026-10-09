import { GetStoreOutputData } from "@/schema/store";
import {
  Avatar,
  Badge,
  Stack,
  Card,
  HStack,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { LiaStoreAltSolid } from "react-icons/lia";

interface Props {
  store: GetStoreOutputData;
  businessName?: string;
  badgeItems: (string | undefined)[];
  href: string;
}

const StoreCard = ({ store, href, badgeItems, businessName }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Body asChild>
        <HStack gap={3}>
          <Avatar.Root variant={"outline"} size={"lg"}>
            <Avatar.Fallback>
              <LiaStoreAltSolid />
            </Avatar.Fallback>
          </Avatar.Root>

          <Stack>
            <HStack justifyContent={"flex-start"} gap={0.5}>
              <Text fontWeight={"semibold"} textStyle={"sm"}>
                {store.name}
              </Text>
              {businessName && (
                <Text color={"fg.muted"} textStyle={"sm"}>
                  @{businessName}
                </Text>
              )}
            </HStack>

            <Card.Description>{store.address}</Card.Description>

            <HStack>
              {badgeItems.filter(Boolean).map((item) => (
                <Badge>{item}</Badge>
              ))}
            </HStack>
          </Stack>
        </HStack>
      </Card.Body>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default StoreCard;
