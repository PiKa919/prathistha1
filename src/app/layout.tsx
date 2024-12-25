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
  title: "Pratishtha Website",
  description: "Official Website for Pratishtha SAKEC Fest 2025",
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://pratishtha-web.vercel.app'),
  openGraph: {
    title: 'Prathistha Website',
    description: 'Official website for Pratishtha SAKEC Fest 2025',
    url: 'https://pratishtha-web.vercel.app',
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
          <Toaster/>
          <Analytics />
          <SpeedInsights />
          <Footer/>
        </div>
      </body>
    </html>
  );
}
