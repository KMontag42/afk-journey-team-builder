"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { tekImages } from "@/lib/images";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoaded,
  useAuth,
} from "@clerk/nextjs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { RelativePageURLs } from "@/lib/pages";

function Links({ pathname }: { pathname: string }) {
  const { isSignedIn } = useAuth();

  const defaultLinks = [
    <Link
      href={RelativePageURLs.builder}
      className={buttonVariants({
        variant: pathname === RelativePageURLs.builder ? "secondary" : "link",
      })}
      key="builder"
      prefetch={true}
    >
      Builder
    </Link>,
    <Link
      href={RelativePageURLs.search}
      className={buttonVariants({
        variant: pathname === RelativePageURLs.search ? "secondary" : "link",
      })}
      key="search"
      prefetch={true}
    >
      Search
    </Link>,
    <Link
      href={RelativePageURLs.guides}
      className={buttonVariants({
        variant: pathname === RelativePageURLs.guides ? "secondary" : "link",
      })}
      key="guides"
      prefetch={true}
    >
      Guides
    </Link>,
    <Link
      href={RelativePageURLs.codes}
      className={buttonVariants({
        variant: pathname === RelativePageURLs.codes ? "secondary" : "link",
      })}
      key="codes"
      prefetch={true}
    >
      Codes
    </Link>,
    <Link
      href={RelativePageURLs.about}
      className={buttonVariants({
        variant: pathname === RelativePageURLs.about ? "secondary" : "link",
      })}
      key="about"
      prefetch={true}
    >
      About
    </Link>,
  ];

  if (isSignedIn) {
    return [
      ...defaultLinks,
      <Link
        href={RelativePageURLs.myFormations}
        className={buttonVariants({
          variant:
            pathname === RelativePageURLs.myFormations ? "secondary" : "link",
        })}
        key="formations"
        prefetch={true}
      >
        My Formations
      </Link>,
    ];
  }

  return defaultLinks;
}

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="flex h-[70px] w-full items-center justify-between px-4 md:px-6 border sticky top-0 bg-slate-900 z-40">
      <Link href="/" prefetch={true}>
        <Image src={tekImages["logo"]} alt="AFK Analytica" className="w-32" />
      </Link>
      <nav className="hidden items-center gap-6 lg:flex">
        <ClerkLoaded>
          {Links({ pathname })}
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton showName={true} />
          </SignedIn>
        </ClerkLoaded>
      </nav>
      <div className="lg:hidden">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton showName={true} />
        </SignedIn>
      </div>
      <ClerkLoaded>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
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
      </ClerkLoaded>
    </header>
  );
}
