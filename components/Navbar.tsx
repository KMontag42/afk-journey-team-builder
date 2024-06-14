"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { tekImages } from "@/lib/images";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { PersonStanding } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="https://afkanalytica.com"
        target="_blank"
        className="justify-self-start"
      >
        <Image
          src={tekImages["logoAnimated"]}
          alt="AFK Analytica"
          className="w-8"
        />
      </Link>
      <div>
        <Link
          href="/"
          className={buttonVariants({
            variant: pathname === "/" ? "secondary" : "link",
          })}
        >
          Home
        </Link>
      </div>
      <div>
        <Link
          href="/builder"
          className={buttonVariants({
            variant: pathname === "/builder" ? "secondary" : "link",
          })}
        >
          Builder
        </Link>
      </div>
      <div>
        <Link
          href="/search"
          className={buttonVariants({
            variant: pathname === "/search" ? "secondary" : "link",
          })}
        >
          Search
        </Link>
      </div>
      <div className="justify-self-end">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div className="pt-2">
            <UserButton afterSignOutUrl="/">
              <UserButton.UserProfileLink
                label="My Layouts"
                url="/formations/mine"
                labelIcon={<PersonStanding />}
              />
            </UserButton>
          </div>
        </SignedIn>
      </div>
    </>
  );
}
