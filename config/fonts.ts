import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// fonts.ts

import { Roboto_Mono } from 'next/font/google';

export const RobotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});


// fonts.ts or your config file
import { Dosis } from "next/font/google";

export const fontDosis = Dosis({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // add more weights as needed
  variable: "--font-dosis",
});
