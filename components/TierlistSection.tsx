import { type SectionData, Tiers } from "@/lib/tierlist";
import Image from "next/image";

type TierlistSectionProps = {
  title: string;
  tiers?: SectionData;
  hideTitle?: boolean;
};
export function TierlistSection({
  title,
  tiers,
  hideTitle,
}: TierlistSectionProps) {
  return (
    <div className="mt-4 sm:mt-0">
      {!hideTitle && <h1>{title}</h1>}
      {Object.values(Tiers).map((tier) => (
        <section key={tier.name} className="flex flex-col sm:flex-row">
          <h2
            style={{ backgroundColor: tier.bgName }}
            className="m-0 p-2 sm:min-w-16 sm:text-center"
          >
            {tier.name}
          </h2>
          <div
            className="flex flex-wrap gap-3 p-2 text-black sm:w-full"
            style={{ backgroundColor: tier.bgSection }}
          >
            {tiers &&
              tiers[tier.name].map((x) => (
                <div
                  className="relative w-12 h-24 sm:w-24 sm:h-36 border rounded"
                  key={x.name}
                >
                  <Image
                    src={`/tierlist/characters/${x.name.split("\n")[0].replaceAll(" ", "")}.png`}
                    fill
                    style={{ objectFit: "cover" }}
                    alt={x.name}
                    className="m-0"
                  />
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
