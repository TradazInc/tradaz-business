import { EmptyState, VStack } from "@chakra-ui/react";
import { HiColorSwatch } from "react-icons/hi";

export default function EmptyPage({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
