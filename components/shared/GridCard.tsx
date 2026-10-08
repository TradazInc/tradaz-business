import {
  Avatar,
  Badge,
  Card,
  Circle,
  HStack,
  Icon,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { MdBusiness } from "react-icons/md";

interface Props {
  logo?: string | null;
  name: string;
  address?: string;
  badgeItems: (string | undefined)[];
  href: string;
}

const GridCard = ({ logo, name, address, href, badgeItems }: Props) => {
  return (
    <Card.Root size={"sm"} flexDirection={"row"}>
      <Circle
        bg={"bg"}
        size={10}
        flexShrink={0}
        overflow={"hidden"}
        alignSelf={"center"}
      >
        {logo ? (
          <Avatar.Root size={"xl"}>
            <Avatar.Image src={logo} />
          </Avatar.Root>
        ) : (
          <Icon size={"xl"}>
            <MdBusiness />
          </Icon>
        )}
      </Circle>

      <Card.Body gap={0}>
        <Card.Title mb="2">{name}</Card.Title>
        <Card.Description>{address}</Card.Description>
        <HStack mt="4">
          {badgeItems.map((item) => (
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
