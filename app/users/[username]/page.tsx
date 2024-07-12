import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserByUsername } from "@/lib/server/users";
import { getFormationsForUserId } from "@/lib/server/formations";
import { getCmsData } from "@/lib/server/cms-data";
import FormationCard from "@/components/FormationCard";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    return <div>User not found</div>;
  }

  const { user_id, username, user_image } = user;

  const cmsData = await getCmsData();
  const formations = await getFormationsForUserId(user_id);

  return (
    <div className="container flex flex-col items-center">
      <div className="flex items-center gap-2 text-2xl">
        <Avatar>
          <AvatarFallback>{username}</AvatarFallback>
          <AvatarImage src={user_image} alt={username} />
        </Avatar>
        <h1>{username}</h1>
      </div>
      <h2 className="text-xl">Formations</h2>
      <div className="md:w-[40vw] mt-4">
        {formations.map((formation) => (
          <FormationCard
            key={formation.id.toString()}
            data={formation}
            cmsData={cmsData}
            hideUser={true}
          />
        ))}
      </div>
    </div>
  );
}
