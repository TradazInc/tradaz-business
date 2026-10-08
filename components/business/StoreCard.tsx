import { Store } from "@/schema/store";
import { Badge, Card, HStack, Icon, LinkOverlay, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LiaStoreAltSolid } from "react-icons/lia";

interface Props {
  store: Store;
  badgeItems: (string | undefined)[];
  href: string;
}

const StoreCard = ({ store, href, badgeItems }: Props) => {
  return (
    <Card.Root size={"sm"} flexDirection={"row"}>
      <Card.Body gap={0}>
        <HStack gap={3}>
          <Icon p={1.5} rounded={"full"} size={"2xl"} borderWidth={"1px"}>
            <LiaStoreAltSolid />
          </Icon>
          <Text fontWeight={"semibold"} textStyle={"sm"}>
            {store.name}
          </Text>
        </HStack>

        <Card.Description my={1}>{store.address}</Card.Description>

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

export default StoreCard;
