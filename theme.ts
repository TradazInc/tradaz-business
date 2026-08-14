import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    /* Force cloudinary iFrame to light mode for transparent canvas */
    'iframe[src^="https://upload-widget.cloudinary.com/"]': {
      colorScheme: "light",
    },
  },
});

export const system = createSystem(defaultConfig, config);
