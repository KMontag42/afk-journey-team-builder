import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/sonner";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Navbar from "@/components/Navbar";

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
          <Navbar />
          <main className="h-[93vh]">
          {children}
          </main>
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
