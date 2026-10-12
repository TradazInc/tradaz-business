import localFont from "next/font/local";

export const objectSans = localFont({
  variable: "--font-object-sans",
  display: "swap",
  src: [
    {
      path: "../public/ObjectSans-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/ObjectSans-Slanted.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/ObjectSans-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/ObjectSans-HeavySlanted.otf",
      weight: "800",
      style: "italic",
    },
  ],
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
