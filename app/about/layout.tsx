export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col gap-y-4 justify-center items-center text-lg prose">
      {children}
    </div>
  );
}
