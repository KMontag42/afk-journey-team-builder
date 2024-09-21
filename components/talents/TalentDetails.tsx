"use client";

import { Talent } from "@/lib/cms-types";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

type TalentDetailProps = {
  talent: Talent;
};

export default function TalentDetails({ talent }: TalentDetailProps) {
  return (
    <>
      {talent ? (
        <Card>
          <CardHeader>{talent.name}</CardHeader>
          <CardContent>{talent.description}</CardContent>
          <CardFooter>Button</CardFooter>
        </Card>
      ) : (
        <div></div>
      )}
    </>
  );
}
