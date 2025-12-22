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
    default: "Custom Paper Cups — From 25 Units | Made in USA",
    template: "%s | US Paper Cup Factory"
  },
  description: "High-quality custom paper cups made in Huntington Beach. Low MOQ (25), free design & 3D mockup, rush options available. Get a free mockup today.",
  keywords: ["custom paper cups", "full-color paper cups 25 minimum", "branded paper cups made in USA", "small order custom coffee cups", "printed paper cups for events", "wholesale custom paper cups"],
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
    title: "US Paper Cup Factory | Custom Full‑Color Paper Cups",
    description: "Custom Printed Paper Cups - Made in USA with Fast Turnaround. Starts at just 25 units.",
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
  twitter: {
    card: 'summary_large_image',
    title: 'US Paper Cup Factory | Custom Full‑Color Paper Cups',
    description: 'Premium custom printed paper cups made in the USA. Low MOQ (25), free design & 3D mockup.',
    images: ['/images/us-paper-cup-factory-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'US Paper Cup Factory',
    url: 'https://uspapercupfactory.com',
    logo: 'https://uspapercupfactory.com/images/us-paper-cup-factory-logo.png',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61585209849866',
      'https://www.instagram.com/us_paper_cup_factory/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-747-338-8959',
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'en',
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
