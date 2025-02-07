import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Analytica.gg",
  description: "The Premier AFK Community Homepage",
  other: { "google-adsense-account": "ca-pub-9844195965003561" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <Providers>
          <Navbar />
          <main className="pt-4">{children}</main>
          <Toaster />
        </Providers>
        <Analytics />
        {googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
      </body>
    </html>
  );
}
