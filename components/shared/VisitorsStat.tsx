import { Badge, FormatNumber, Stat, StatRootProps } from "@chakra-ui/react";
import { StatContainer } from "./StatContainer";

export const VisitorsStat = ({ ...props }: StatRootProps) => {
  return (
    <StatContainer {...props}>
      <Stat.Label>Unique visitors</Stat.Label>
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
