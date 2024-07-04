"use client";

import { UserProfile } from "@clerk/nextjs";

export default function UserProfilePage() {
  return (
    <div className="container flex justify-center">
      <UserProfile />
    </div>
  );
}
