import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "US Paper Cup Factory | Custom Printed Cups Made in USA",
  description: "The premier American manufacturer of custom printed paper cups. Fast turnaround, high quality, and free design services. Order online today.",
  keywords: ["paper cups", "custom cups", "printed cups", "coffee cups", "branded cups", "wholesale cups", "made in USA"],
  openGraph: {
    title: "US Paper Cup Factory",
    description: "Custom Printed Paper Cups - Made in USA with Fast Turnaround.",
    siteName: "US Paper Cup Factory",
    type: "website",
  },
  authors: [{ name: "US Paper Cup Factory" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
