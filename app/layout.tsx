import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AFKJourney Team Builder",
  description: "A team builder for AFKJourney, by 0xKRM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <Providers>
          <Navbar />
          <main className="flex h-[90vh] flex-col items-center pt-2">
            {children}
          </main>
          <footer className="flex h-[3vh] absolute bottom-0 justify-center w-full pb-2">
            <Footer />
          </footer>
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
