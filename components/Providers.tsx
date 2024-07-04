import { ClerkProvider } from "@clerk/nextjs"

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
