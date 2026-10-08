import {
  Badge,
  Box,
  Card,
  HStack,
  Icon,
  Image,
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
      <Icon size={"lg"}>
        {logo ? (
          <Image src={logo} borderRadius={"full"} fit={"cover"} />
        ) : (
          <MdBusiness />
        )}
      </Icon>

      <Box>
        <Card.Body>
          <Card.Title mb="2">{name}</Card.Title>
          <Card.Description>{address}</Card.Description>
          <HStack mt="4">
            {badgeItems.map((item) => (
              <Badge>{item}</Badge>
            ))}
          </HStack>
        </Card.Body>
      </Box>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default GridCard;
