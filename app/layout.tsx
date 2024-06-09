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
  description: "A team builder for AFKJourney, by KRM",
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
          <header className="grid grid-cols-5 items-center justify-center text-center px-2 md:px-16 h-[8vh] md:h-[5vh]">
            <Navbar />
          </header>
          <main className="flex h-[92vh] md:h-[95vh] flex-col items-center pt-2">
            {children}
          </main>
          <footer className="flex absolute bottom-0 justify-center w-full pb-2">
            <Footer />
          </footer>
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
