import { type SectionData, Tiers } from "@/lib/tierlist";

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
    <>
      {!hideTitle && <h1>{title}</h1>}
      {Tiers.map((tier) => (
        <section key={tier}>
          <h2>{tier}</h2>
          <div className="flex flex-wrap gap-3">
            {tiers &&
              tiers[tier].map((x) => (
                <div className="whitespace-pre border rounded p-4" key={x.name}>
                  {x.name}
                </div>
              ))}
          </div>
        </section>
      ))}
    </>
  );
}
