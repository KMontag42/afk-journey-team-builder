import Link from "next/link";

export default async function AboutPage() {
  return (
    <div className="container md:text-center">
      <p className="text-lg mb-2 text-center">
        Made with &hearts; by{" "}
        <Link
          className="underline"
          href={"https://discordapp.com/users/89367326989770752"}
        >
          0xKRM
        </Link>
      </p>
      <p>
        This website is a work in progress.
      </p>
      <p>I&apos;m adding features and fixing bugs as I find them.</p>
      <p>I&apos;m also open to suggestions for new features.</p> 
      <p className="text-center mt-2">
      <Link 
        href="https://discord.com/channels/731929330896338995/1239184444926201906" 
        className="underline">
        Discord thread
      </Link>
      </p>
    </div>
  );
}
