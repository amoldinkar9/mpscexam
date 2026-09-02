import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";

const googleSans = Google_Sans({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "mpscexam | MPSC Group C Pre Exam Test Series 2026",
  description: "MPSC Group C पूर्व परीक्षा 2026 साठी परिपूर्ण टेस्ट सिरीज. 15 फुल-लेंथ + 10 चालू घडामोडी टेस्ट्स.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mr" className={googleSans.variable}>
      <body className={`${googleSans.className} bg-[#fafbfc] text-[#1f2a5c] antialiased`}>
        {children}
      </body>
    </html>
  );
}
