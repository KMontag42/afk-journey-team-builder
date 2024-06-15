"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { tekImages } from "@/lib/images";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

function Links({ pathname }: { pathname: string }) {
  return [
    <Link
      href="/builder"
      className={buttonVariants({
        variant: pathname === "/builder" ? "secondary" : "link",
      })}
      key="builder"
    >
      Builder
    </Link>,
    <Link
      href="/search"
      className={buttonVariants({
        variant: pathname === "/search" ? "secondary" : "link",
      })}
      key="search"
    >
      Search
    </Link>,
    <Link
      href="/formations/mine"
      className={buttonVariants({
        variant: pathname === "/formations/mine" ? "secondary" : "link",
      })}
      key="mine"
    >
      My Formations
    </Link>,
    <Link
      href="/about"
      className={buttonVariants({
        variant: pathname === "/about" ? "secondary" : "link",
      })}
      key="about"
    >
      About
    </Link>,
  ];
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex h-[7vh] w-full items-center justify-between px-4 md:px-6 border sticky top-0 bg-slate-900 z-40">
      <Link href="/" prefetch={false}>
        <Image
          src={tekImages["logoAnimated"]}
          alt="AFK Analytica"
          className="w-8"
        />
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        {Links({ pathname })}
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
            {Links({ pathname }).map((link, i) => (
              <SheetClose key={i} asChild>
                {link}
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
