import { UserProfile } from "@clerk/nextjs";

export default async function UserProfilePage() {
  return (
    <div className="container flex justify-center">
      <UserProfile path="/user-profile" />
    </div>
  );
}
