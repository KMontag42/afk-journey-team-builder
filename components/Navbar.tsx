"use client";

import Link from "next/link";
import Image from "next/image";

import { tekImages } from "@/lib/images";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
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
      <Link href="/">Home</Link>
      <Link href="/builder">Builder</Link>
      <Link href="/popular">Popular</Link>
      <div className="pt-2 justify-self-end">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  );
}
