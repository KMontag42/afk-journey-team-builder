import { type SectionData, Tiers } from "@/lib/tierlist";
import { DivideCircle } from "lucide-react";

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
                <div className="whitespace-pre border rounded p-4" key={x.name}>
                  {x.name}
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
