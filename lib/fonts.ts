import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Noto_Nastaliq_Urdu } from "next/font/google";

// English fonts (existing)
export const geistSans = GeistSans;
export const geistMono = GeistMono;

// Urdu font - Jameel Noori equivalent font from Google Fonts
export const urduFont = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urdu",
  display: "swap",
});

// You can also use Amiri as an alternative Arabic/Urdu font
// import { Amiri } from "next/font/google";
// export const urduFont = Amiri({
//   subsets: ["arabic"],
//   weight: ["400", "700"],
//   variable: "--font-urdu",
//   display: "swap",
// });
