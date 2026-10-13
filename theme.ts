import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "var(--font-raleway), system-ui, sans-serif" },
        heading: { value: "var(--font-poiret-one), system-ui, sans-serif" },
        mono: { value: "var(--font-raleway), system-ui, sans-serif" },
      },
    },
    recipes: {
      /* Poiret One only ships a regular (400) weight */
      heading: {
        base: {
          fontWeight: "normal",
          textTransform: "uppercase",
        },
      },
    },
  },
  globalCss: {
    "html, body": {
      fontFamily: "body",
    },
    "h1, h2, h3, h4, h5, h6": {
      fontFamily: "heading",
      fontWeight: "normal",
      textTransform: "uppercase",
    },
    /* Force cloudinary iFrame to light mode for transparent canvas */
    'iframe[src^="https://upload-widget.cloudinary.com/"]': {
      colorScheme: "light",
    },
  },
});

export const system = createSystem(defaultConfig, config);
