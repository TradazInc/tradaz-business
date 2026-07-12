import { HStack, type StackProps } from "@chakra-ui/react";
import { forwardRef } from "react";

export const PageContainer = forwardRef<HTMLDivElement, StackProps>(
  function PageContainer(props, ref) {
    return (
      <HStack
        w={"dvw"}
        h={"full"}
        px={{ base: 10, md: 36 }}
        ref={ref}
        {...props}
      >
        {props.children}
      </HStack>
    );
  },
);
