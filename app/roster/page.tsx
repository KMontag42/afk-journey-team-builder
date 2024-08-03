"use server";

import { auth } from "@clerk/nextjs/server";

import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { getRosterCmsData } from "@/lib/server/cms-data";

type CharacterClass = {
  name: string;
  imageUrl: string;
};

export default async function MyRoster() {
  const jsonData = await getRosterCmsData();
  const classes: CharacterClass[] = Object.entries(jsonData.classes).map(
    ([key, data]: [string, any]) => ({
      key: key,
      name: data["name"],
      imageUrl: data["imageUrl"],
    }),
  );

  const { userId, sessionClaims } = auth();

  if (!userId) {
    auth().redirectToSignIn();
    return;
  }

  return (
    <div className="container">
      <Tabs defaultValue="account" className="max-w-[400px]">
        <TabsList>
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          <TabsTrigger value="starter">Starter</TabsTrigger>
        </TabsList>
        <TabsContent value="seasonal">
          <Card>
            <CardHeader>
              <CardTitle className="text-atekgold">Seasonal Gear</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-y-4 pr-2">
                {classes.map((characterClass) => (
                  <div className="grid grid-cols-2 items-center">
                    <Image
                      className="justify-self-end"
                      alt={characterClass.name}
                      src={characterClass.imageUrl}
                      width={48}
                      height={48}
                    />
                    <Label className="pl-2 text-xs">
                      {characterClass.name}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="starter">Starter Equipment levels</TabsContent>
      </Tabs>
    </div>
  );
}
