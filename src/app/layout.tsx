import type { Metadata } from "next";
import localFont from "next/font/local";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";

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
  metadataBase: new URL("https://mpscexam.in"),
  title: {
    default: "mpscexam | MPSC Group C Test Series 2026-2027 — tcs9 MASTER25",
    template: "%s | mpscexam",
  },
  description:
    "MPSC Group C पूर्व परीक्षा २०२६-२०२७ साठी अधिकृत टेस्ट सिरीज. tcs9 MASTER25 सह २५ फुल-लेंथ सराव पेपर्स, २५००+ संकल्पना आणि अचूक -०.२५ निगेटिव्ह मार्किंग विश्लेषण.",
  keywords: [
    "mpsc group c test series 199 rupees",
    "mpsc group c test series MASTER25",
    "tcs9 master25",
    "mpsc 25 full length tests",
    "mpsc 2500 concepts",
    "mpsc exam date 2026",
    "mpsc group c exam postponed to 3 january 2027",
    "एमपीएससी गट क पूर्व परीक्षा टेस्ट सिरीज",
    "एमपीएससी टेस्ट सिरीज १९९ रुपये",
    "mpsc clerk typist test series",
    "mpsc tax assistant test series",
    "best affordable mpsc test series",
    "mpscexam",
  ],
  authors: [{ name: "mpscexam" }],
  creator: "mpscexam",
  publisher: "mpscexam",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "https://mpscexam.in",
    types: {
      "application/xml": "https://mpscexam.in/sitemap.xml",
    },
  },
  openGraph: {
    title: "mpscexam | MPSC Group C Test Series — tcs9 MASTER25",
    description:
      "MPSC Group C पूर्व परीक्षा २०२६-२०२७ साठी अधिकृत टेस्ट सिरीज. २५ फुल-लेंथ सराव पेपर्स, २५००+ संकल्पना आणि अचूक -०.२५ निगेटिव्ह मार्किंग.",
    url: "https://mpscexam.in",
    siteName: "mpscexam",
    locale: "mr_IN",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "mpscexam Official Platform Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mpscexam | MPSC Group C Test Series — tcs9 MASTER25",
    description: "२५ फुल-लेंथ सराव पेपर्स व २५००+ संकल्पना. अचूक -०.२५ निगेटिव्ह मार्किंगसह सराव करा.",
    images: ["/logo.png"],
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
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className="bg-[#fafbfc] text-[#1f2a5c] antialiased">
        {children}
      </body>
    </html>
  );
}
