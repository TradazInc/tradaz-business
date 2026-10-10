import {
  Badge,
  FormatNumber,
  HStack,
  Stat,
  StatRootProps,
} from "@chakra-ui/react";

export const SalesStat = ({ ...props }: StatRootProps) => {
  return (
    <Stat.Root
      p={4}
      w={"full"}
      h={"full"}
      rounded={"md"}
      borderWidth={"1px"}
      {...props}
    >
      <Stat.Label>Sales</Stat.Label>
      <HStack>
        <Stat.ValueText>
          <FormatNumber
            value={845600.4}
            style={"currency"}
            currency={"NGN"}
            maximumFractionDigits={0}
          />
        </Stat.ValueText>
        <Badge colorPalette={"green"} gap={"0"}>
          <Stat.UpIndicator />
          12%
        </Badge>
      </HStack>
      <Stat.HelpText>since last month</Stat.HelpText>
    </Stat.Root>
  );
};
