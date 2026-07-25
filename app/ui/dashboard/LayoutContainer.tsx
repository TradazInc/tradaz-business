import { Grid } from "@chakra-ui/react";

export const LayoutContainer = ({ children }: { children: React.ReactNode }) => (
  <Grid h="dvh" templateRows={"auto minmax(0, 1fr)"}>
    {children}
  </Grid>
);
