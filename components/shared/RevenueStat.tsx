import { FormatNumber, Progress, Stat, StatRootProps } from "@chakra-ui/react";

export const RevenueStat = ({ ...props }: StatRootProps) => {
  return (
    <Stat.Root
      p={8}
      w={"full"}
      h={"full"}
      rounded={"md"}
      borderWidth={"1px"}
      {...props}
    >
      <Stat.Label>Revenue</Stat.Label>
      <Stat.ValueText>
        <FormatNumber
          value={134000}
          style={"currency"}
          currency={"NGN"}
          maximumFractionDigits={0}
        />
      </Stat.ValueText>
      <Stat.HelpText mb="2">+12% from last week</Stat.HelpText>
      <Progress.Root>
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Stat.Root>
  );
};
