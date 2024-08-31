"use server";

import { RelativePageURLs } from "@/lib/pages";
import Link from "next/link";

export default async function Disclaimer() {
  return (
    <>
      <div className="text-xl font-bold pb-4">Disclaimer</div>
      <ul className="list-disc px-4">
        <li className="text-sm">
          <Link className="underline" href="https://atek.afkanalytica.com/">
            Analytica
          </Link>
          <span> is an &apos;AFK Universe fansite&apos; for the game </span>
          <Link
            className="underline"
            href="https://afkjourney.farlightgames.com/"
          >
            AFK Journey
          </Link>
        </li>
        <li className="text-sm">
          <span>Not affilated with </span>
          <Link
            className="underline"
            href="https://www.lilith.com/?locale=en-US"
          >
            Lilith Games
          </Link>
        </li>
        <li className="text-sm">
          <span>Copyright &copy; </span>
          <Link className="underline" href={RelativePageURLs.about}>
            Analytica
          </Link>
          <span> {new Date().getFullYear()}</span>
        </li>
      </ul>
    </>
  );
}
