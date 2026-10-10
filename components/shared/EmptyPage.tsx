import { EmptyState, VStack } from "@chakra-ui/react";
import React from "react";
import { HiColorSwatch } from "react-icons/hi";

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function EmptyPage({ title, description, children }: Props) {
  return (
    <EmptyState.Root size={"lg"}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          {children || <HiColorSwatch />}
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>{title}</EmptyState.Title>
          <EmptyState.Description>{description}</EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
