"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sections } from "@/lib/tierlist";
import { useState } from "react";
import { TierlistSection } from "./TierlistSection";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MobileTierlist() {
  const [section, setSection] = useState<string>("overall");

  return (
    <>
      {/*<Select defaultValue="overall" onValueChange={setSection}>
        <SelectTrigger className="sm:hidden">
          <SelectValue placeholder="Overall" />
        </SelectTrigger>
        <SelectContent>
          {Object.values(Sections).map((x) => (
            <SelectItem value={x.value} key={x.name}>
              {x.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>*/}
      <div className="sm:hidden">
        <Alert>
          <AlertTitle>The other categories are being updated</AlertTitle>
          <AlertDescription>
            Thank you for bearing with us while we update the site!
          </AlertDescription>
        </Alert>

        <TierlistSection
          title={Sections[section].name}
          tiers={Sections[section].data}
          hideTitle
        />
      </div>
    </>
  );
}
