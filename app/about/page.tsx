import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { tekImages } from "@/lib/images";

export default async function AboutPage() {
  return (
    <div className="container flex flex-col gap-y-4 justify-center items-center text-lg">
      <p>
        Made with <span className="text-atekgold">&hearts;</span> by the
        Analytica team!
      </p>
      <div className="">
        <Link
          className="underline"
          href={"https://discordapp.com/users/89367326989770752"}
        >
          0xKRM
        </Link>
        {" | "}
        <Link
          className="underline"
          href={"https://discordapp.com/users/281932803489136640"}
        >
          xFlaws
        </Link>
        {" | "}
        <Link
          className="underline"
          href={"https://discordapp.com/users/476107422214389763"}
        >
          inSeas0n
        </Link>{" "}
      </div>
      <p className="text-lg mb-2 text-center">
        with special help from the AFK Analytica community.
      </p>
      <p className="text-center">Consider supporting us by donating here:</p>
      <div className="flex flex-row flex-wrap items-center justify-center gap-4">
        <Button variant="analytica" asChild>
          <Link
            href="https://www.patreon.com/bePatron?u=127053369"
            data-patreon-widget-type="become-patron-button"
          >
            <Image
              src={tekImages.patreonIcon}
              alt="KoFi Cup"
              height={36}
              width={36}
              className=" pr-2"
            />
            Support Us on Patreon
          </Link>
        </Button>
        <Button variant="analytica" asChild>
          <Link
            target="_blank"
            href="https://ko-fi.com/analytica"
            className="w-48"
          >
            <Image
              src={tekImages.kofiCup}
              alt="KoFi Cup"
              height={36}
              width={36}
              className="pr-2"
            />
            Support Us on Ko-Fi
          </Link>
        </Button>
      </div>
      <p className="flex flex-row gap-x-4 pt-4">
        <Link target="_blank" href="https://discord.com/invite/analytica">
          <div className="flex flex-col items-center">
            <Image
              src={tekImages["discordLogo"]}
              alt="Discord Logo"
              className="w-8"
            />
          </div>
        </Link>
        {" | "}
        <Link
          href="https://discord.com/channels/731929330896338995/1239184444926201906"
          className="underline"
        >
          Discord thread
        </Link>
      </p>
    </div>
  );
}
