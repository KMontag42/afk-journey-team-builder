"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { tekImages } from "@/lib/images";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

function Links({ pathname }: { pathname: string }) {
  return (
    <>
      <Link
        href="/"
        className={buttonVariants({
          variant: pathname === "/" ? "secondary" : "link",
        })}
      >
        Home
      </Link>
      <Link
        href="/builder"
        className={buttonVariants({
          variant: pathname === "/builder" ? "secondary" : "link",
        })}
      >
        Builder
      </Link>
      <Link
        href="/search"
        className={buttonVariants({
          variant: pathname === "/search" ? "secondary" : "link",
        })}
      >
        Search
      </Link>
      <SignedIn>
        <Link
          href="/formations/mine"
          className={buttonVariants({
            variant: pathname === "/formations/mine" ? "secondary" : "link",
          })}
        >
          My Formations
        </Link>
      </SignedIn>
    </>
  )
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex h-[7vh] w-full items-center justify-between px-4 md:px-6">
      <Link
        href="https://afkanalytica.com"
        target="_blank"
      >
        <Image
          src={tekImages["logoAnimated"]}
          alt="AFK Analytica"
          className="w-8"
        />
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <Links pathname={pathname} />
      </nav>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <div className="pt-2">
          <UserButton />
        </div>
      </SignedIn>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <Links pathname={pathname} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
