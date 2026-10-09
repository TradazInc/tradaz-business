import { Badge, HStack } from "@chakra-ui/react";

interface Props {
  items: (string | undefined)[];
}

const BadgeList = ({ items }: Props) => {
  return (
    <HStack>
      {items.filter(Boolean).map((item) => (
        <Badge>{item}</Badge>
      ))}
    </HStack>
  );
};

export default BadgeList;
