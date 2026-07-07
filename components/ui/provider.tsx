"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { Toaster } from "./toaster";

export function Provider({ children, ...props }: ColorModeProviderProps) {
  return (
    <ColorModeProvider {...props}>
      <ChakraProvider value={defaultSystem}>
        {children}
        <Toaster />
      </ChakraProvider>
    </ColorModeProvider>
  );
}
