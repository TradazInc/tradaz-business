import {
  Card,
  Heading,
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
  createdAt?: string;
  href: string;
}

const GridCard = ({ logo, name, address, createdAt, href }: Props) => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <HStack gap={1.5}>
          <Icon size={"lg"}>
            {logo ? (
              <Image src={logo} borderRadius={"full"} fit={"cover"} />
            ) : (
              <MdBusiness />
            )}
          </Icon>
          <Heading size={"sm"}>{name}</Heading>
        </HStack>
      </Card.Header>

      <Card.Body
        textStyle={"sm"}
        color={"fg.muted"}
        textAlign={"start"}
        alignItems={"flex-start"}
      >
        {address}
      </Card.Body>

      <Card.Footer
        textStyle={"sm"}
        color={"fg.muted"}
        textAlign={"start"}
        alignItems={"flex-start"}
      >
        {createdAt}
      </Card.Footer>

      <LinkOverlay asChild>
        <NextLink href={href} />
      </LinkOverlay>
    </Card.Root>
  );
};

export default GridCard;
