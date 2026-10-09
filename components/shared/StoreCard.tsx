import { GetStoreOutputData } from "@/schema/store";
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
import { LiaStoreAltSolid } from "react-icons/lia";
import BadgeList from "./BadgeList";

interface Props {
  store: GetStoreOutputData;
  businessName?: string;
  href: string;
}

const StoreCard = ({ store, href, businessName }: Props) => {
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

            <BadgeList
              items={[format(store.createdAt, "dd MMM yy").toUpperCase()]}
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

export default StoreCard;
