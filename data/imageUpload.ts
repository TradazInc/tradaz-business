import { system } from "@/theme";

export const lightModePalette = {
  window: system.token("colors.white"),
  sourceBg: system.token("colors.white"),
  windowBorder: system.token("colors.gray.200"),
  tabIcon: system.token("colors.black"),
  inactiveTabIcon: system.token("colors.gray.400"),
  menuIcons: "#5A616A",
  link: system.token("colors.gray.100"),
  action: "#FF620C",
  inProgress: system.token("colors.blue.600"),
  complete: system.token("colors.green.600"),
  error: system.token("colors.red.500"),
  textDark: system.token("colors.black"),
  textLight: system.token("colors.gray.50"),
};

export const darkModePalette = {
  window: system.token("colors.gray.950"),
  sourceBg: system.token("colors.gray.950"),
  windowBorder: system.token("colors.gray.800"),
  tabIcon: system.token("colors.gray.50"),
  inactiveTabIcon: system.token("colors.gray.500"),
  menuIcons: "#2AD9FF",
  link: system.token("colors.gray.900"),
  action: "#336BFF",
  inProgress: system.token("colors.blue.300"),
  complete: system.token("colors.green.300"),
  error: system.token("colors.red.400"),
  textDark: system.token("colors.black"),
  textLight: system.token("colors.gray.50"),
};
