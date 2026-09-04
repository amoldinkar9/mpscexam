import type { Metadata } from "next";
import localFont from "next/font/local";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
  display: "swap",
});

const samaDevanagari = localFont({
  src: [
    {
      path: "./fonts/SamaDevanagari-Regular-01.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SamaDevanagari-Book-02.ttf",
      weight: "450",
      style: "normal",
    },
    {
      path: "./fonts/SamaDevanagari-Medium-03.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/SamaDevanagari-SemiBold-04.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/SamaDevanagari-Bold-05.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/SamaDevanagari-ExtraBold-06.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-sama-devanagari",
  declarations: [
    {
      prop: "unicode-range",
      value: "U+0900-097F, U+A8E0-A8FF, U+1CD0-1CFF, U+200C-200D, U+20B9",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MPSC Group C Test Series",
  description: "MPSC Group C पूर्व परीक्षा 2026 साठी परिपूर्ण टेस्ट सिरीज. 15 फुल-लेंथ + 10 चालू घडामोडी टेस्ट्स.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={`${googleSans.variable} ${samaDevanagari.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="bg-[#fafbfc] text-[#1f2a5c] antialiased">
        {children}
      </body>
    </html>
  );
}
