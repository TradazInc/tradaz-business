import { Montserrat_Alternates, Poiret_One } from "next/font/google";

export const montserratAlternates = Montserrat_Alternates({
  variable: "--font-montserrat-alternates",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const poiretOne = Poiret_One({
  variable: "--font-poiret-one",
  subsets: ["latin"],
  weight: "400",
});
