import Link from "next/link";

export default async function AboutPage() {
  return (
    <main className="container md:text-center pt-4">
      <p className="text-lg mb-2 text-center">
        Made with &hearts; by{" "}
        <Link
          className="underline"
          href={"https://discordapp.com/users/89367326989770752"}
        >
          0xKRM
        </Link> with special help from the AFKJourney community.
      </p>
      <p>
        This tool is always evolving!
      </p>
      <p>We are adding features and fixing bugs as I find them.</p>
      <p>We are also open to suggestions for new features.</p> 
      <p className="text-center mt-2">
      <Link 
        href="https://discord.com/channels/731929330896338995/1239184444926201906" 
        className="underline">
        Discord thread
      </Link>
      </p>
    </main>
  );
}
