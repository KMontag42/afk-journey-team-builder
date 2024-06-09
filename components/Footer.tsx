import Link from "next/link";

export default function Footer() {
  return (
    <>
      <p className="mt-1 text-xs">
        Made with &hearts; by{" "}
        <Link
          className="underline"
          href={"https://discordapp.com/users/89367326989770752"}
        >
          0xKRM
        </Link>
      </p>
    </>
  );
}
