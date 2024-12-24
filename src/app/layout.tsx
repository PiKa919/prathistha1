import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import Menu from "@/components/menu";
import Head from "next/head";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"
import { CustomCursor } from "@/components/CustomCursor"
import { Analytics } from "@vercel/analytics/react"

<link rel="icon" href="/favicon.ico" sizes="any" />

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pratishtha Website",
  description: "Official Website for Pratishtha SAKEC Fest 2025",
  icons: [
    {
      url: "/favicon.ico",
      sizes: "any",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="description" content="Official website for Pratishtha SAKEC Fest 2025" />
        <meta property="og:title" content="Prathistha Website" />
        <meta property="og:url" content="https://pratishtha-web.vercel.app" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CustomCursor />
        <Menu/>
        <div className="content">
        <main style={{ height: 'calc(100% - 60px)' }}>{children}</main>
        <Toaster/>
        {/* {children} */}
        <Analytics />
        <SpeedInsights />
        <Footer/>
        </div>
      </body>
    </html>
  );
}
