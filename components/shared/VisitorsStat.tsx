import { Badge, Stat, StatRootProps } from "@chakra-ui/react";
import { StatContainer } from "./StatContainer";

export const VisitorsStat = ({ ...props }: StatRootProps) => {
  return (
    <StatContainer {...props}>
      <Stat.Label>Unique visitors</Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
      <Badge colorPalette={"red"} variant={"plain"} px={"0"}>
        <Stat.DownIndicator />
        1.9%
      </Badge>
    </StatContainer>
  );
};
