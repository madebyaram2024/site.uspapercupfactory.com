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
  metadataBase: new URL('https://uspapercupfactory.com'),
  title: {
    default: "US Paper Cup Factory | Custom Printed Cups Made in USA",
    template: "%s | US Paper Cup Factory"
  },
  description: "The premier American manufacturer of custom printed paper cups. Fast turnaround, high quality, and free design services. Order online today.",
  keywords: ["paper cups", "custom cups", "printed cups", "coffee cups", "branded cups", "wholesale cups", "made in USA"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "US Paper Cup Factory",
    description: "Custom Printed Paper Cups - Made in USA with Fast Turnaround.",
    url: 'https://uspapercupfactory.com',
    siteName: "US Paper Cup Factory",
    locale: 'en_US',
    type: "website",
    images: [
      {
        url: '/images/us-paper-cup-factory-logo.png',
        width: 1200,
        height: 630,
        alt: 'US Paper Cup Factory - Custom Printed Paper Cups Made in USA',
      },
    ],
  },
  authors: [{ name: "US Paper Cup Factory" }],
  icons: {
    icon: '/images/favicon.png',
    apple: '/images/favicon.png',
  },
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
