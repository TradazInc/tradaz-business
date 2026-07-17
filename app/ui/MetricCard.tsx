import { Card, Heading } from "@chakra-ui/react";

const MetricCard = () => {
  return (
    <Card.Root size={"sm"}>
      <Card.Header>
        <Heading>Heading</Heading>
      </Card.Header>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Description>Description</Card.Description>
      </Card.Body>
      <Card.Footer>Footer</Card.Footer>
    </Card.Root>
  );
};

export default MetricCard;
