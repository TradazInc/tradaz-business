import { Badge, Stat, StatRootProps } from "@chakra-ui/react";

export const VisitorsStat = ({ ...props }: StatRootProps) => {
  return (
    <Stat.Root
      p={4}
      w={"full"}
      h={"full"}
      rounded={"md"}
      borderWidth={"1px"}
      {...props}
    >
      <Stat.Label>Unique visitors</Stat.Label>
      <Stat.ValueText>192.1k</Stat.ValueText>
      <Badge colorPalette={"red"} variant={"plain"} px={"0"}>
        <Stat.DownIndicator />
        1.9%
      </Badge>
    </Stat.Root>
  );
};
