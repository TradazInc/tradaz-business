import { EmptyState, VStack } from "@chakra-ui/react";
import { HiColorSwatch } from "react-icons/hi";

export default function EmptyPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <EmptyState.Root flex="1" w="full">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <HiColorSwatch />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
        {children}
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
