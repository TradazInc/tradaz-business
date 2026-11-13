import { Badge, Wrap } from "@chakra-ui/react";

interface Props {
  items: (string | undefined)[];
}

const BadgeList = ({ items }: Props) => {
  return (
    <Wrap>
      {items.filter(Boolean).map((item) => (
        <Badge>{item}</Badge>
      ))}
    </Wrap>
  );
};

export default BadgeList;
