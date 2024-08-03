import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="flex flex-row text-2xl my-4">
        <h2 className="text-atekgold font-bold pr-4 border-r-2 border-atekgold mr-4">
          404
        </h2>
        <p>Page Not Found</p>
      </div>
      <Link href="/">
        <Button variant="secondary">Return Home</Button>
      </Link>
    </div>
  );
}
