import { Outfit } from "next/font/google";
import localFont from "next/font/local";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const inferenceSans = localFont({
  variable: "--font-inference-sans",
  display: "swap",
  src: [
    {
      path: "../public/InferenceSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});
