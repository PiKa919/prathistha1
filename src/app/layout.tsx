import { Suspense } from 'react'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"
import { CustomCursor } from "@/components/CustomCursor"
import { ScrollProgress } from '@/components/ui/scroll-progress';

config.autoAddCss = false

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',  // Add display swap for better font loading
  preload: true,
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'Pratishtha 2025',
  description: 'Pratishtha - Annual College Symposium at SAKEC',
  keywords: ['college fest', 'symposium', 'SAKEC', 'Pratishtha', 'technical fest'],
  authors: [{ name: 'SAKEC' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://pratishtha-web.vercel.app/',
    siteName: 'Pratishtha 2024',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/MAEL____.TTF"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CustomCursor />
        <Suspense fallback={<div>Loading...</div>}>
          <Menu />
        </Suspense>
        <div className="content">
          <main style={{ height: 'calc(100% - 60px)' }}>{children}</main>
        <ScrollProgress />
          <Toaster/>
          <Analytics />
          <SpeedInsights />
          <Footer/>
        </div>
      </body>
    </html>
  );
}
