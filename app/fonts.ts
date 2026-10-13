import { Raleway, Space_Grotesk } from "next/font/google";

export const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
