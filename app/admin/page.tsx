import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminHome() {
  return (
    <div className="container flex flex-col items-center">
      <h1>Admin Home</h1>
      <p>Welcome to the admin dashboard</p>

      <Link className="my-4" href="/admin/editor">
        <Button>Guide Editor</Button>
      </Link>
    </div>
  );
}
