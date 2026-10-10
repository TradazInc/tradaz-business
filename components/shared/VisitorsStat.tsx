import {
  Badge,
  FormatNumber,
  HStack,
  Icon,
  Stat,
  StatRootProps,
} from "@chakra-ui/react";
import { StatContainer } from "./StatContainer";
import { FaUsers } from "react-icons/fa";

export const VisitorsStat = ({ ...props }: StatRootProps) => {
  return (
    <StatContainer {...props}>
      <HStack justify={"space-between"}>
        <Stat.Label>Unique visitors</Stat.Label>
        <Icon color={"fg.muted"}>
          <FaUsers />
        </Icon>
      </HStack>

      <Stat.ValueText>
        <FormatNumber
          value={192100}
          notation={"compact"}
          compactDisplay={"short"}
        />
      </Stat.ValueText>

      <Badge colorPalette={"red"} variant={"plain"} px={"0"}>
        <Stat.DownIndicator />
        1.9%
      </Badge>
    </StatContainer>
  );
};
