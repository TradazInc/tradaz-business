import { Box, Card, Heading, Icon, Image } from "@chakra-ui/react";
import { LuBuilding2 } from "react-icons/lu";

interface Props {
  logo?: string | null;
  name: string;
  address?: string;
}

const GridCard = ({ logo, name, address }: Props) => {
  return (
    <Card.Root flexDirection={"row"}>
      <Icon>
        {logo ? (
          <Image
            src={logo}
            borderRadius={"full"}
            fit={"cover"}
            rounded={"full"}
            as={Icon}
          />
        ) : (
          <LuBuilding2 />
        )}
      </Icon>
      <Box>
        <Card.Header>
          <Heading>{name}</Heading>
        </Card.Header>
        <Card.Body color={"fg.muted"}>{address}</Card.Body>
      </Box>
    </Card.Root>
  );
};

export default GridCard;
