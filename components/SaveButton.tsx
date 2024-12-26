"use client";

import { FormEvent, useState } from "react";

import { Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { track } from "@vercel/analytics";
import { useRouter } from "next/navigation";

type SaveButtonProps = {
  formation: string[];
  artifact: string;
  layout: number;
  user: { id: string };
  name?: string;
  id?: number;
  tags?: string[];
  formationShareId?: string;
};

export default function SaveButton({
  formation,
  artifact,
  layout,
  user,
  name,
  id,
  tags,
  formationShareId,
}: SaveButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const { name, formationShareId } = e.target as typeof e.target & {
      name: { value: string };
      formationShareId: { value: string };
    };

    console.log("formationShareId", formationShareId);

    if (formation.filter((x) => x != "").length === 0) {
      toast.error("Formation is empty!");
      setOpen(false);
      track("formation_save_error", {
        error: "Formation is empty",
      });
      return;
    }

    setOpen(false);

    const formationData = {
      formation,
      artifact,
      layout: Math.trunc(layout),
      user_id: user.id,
      name: name.value,
      tags,
      formationShareId: formationShareId.value,
    };

    const requestUrl = id ? `/api/formations/${id}` : "/api/formations";
    const requestOptions = {
      method: id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formationData),
    };
    const trackEvent = id ? "formation_updated" : "formation_created";
    const trackData = {
      ...formationData,
      formation: formation.join(","),
      id: id || -1,
      tags: JSON.stringify(formationData.tags),
      formationShareId: formationData.formationShareId || "",
    };

    try {
      const response = await (await fetch(requestUrl, requestOptions)).json();

      toast.success("Formation saved!");
      track(trackEvent, trackData);
      router.push(`/formations/${response.id}`);
    } catch (error: any) {
      toast.error("Failed to save formation!");
      track("formation_save_error", {
        error: JSON.stringify(error),
      });
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="h-8 px-2">
          <Save />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="container">
          <DrawerHeader className="text-left">
            <DrawerTitle>Save Formation</DrawerTitle>
            <DrawerDescription>
              Save this formation with a name.
            </DrawerDescription>
          </DrawerHeader>
          <SaveFormationForm
            className="px-4"
            onSubmit={handleSave}
            name={name}
            formationShareId={formationShareId}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SaveFormationForm({
  className,
  onSubmit,
  name,
  formationShareId,
}: React.ComponentProps<"form"> & { formationShareId?: string }) {
  return (
    <form
      className={cn("grid items-center gap-4", className)}
      onSubmit={onSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Formation Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="f2p Team"
          defaultValue={name}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="formationShareId">Formation Share ID</Label>
        <Input
          type="text"
          id="formationShareId"
          name="formationShareId"
          placeholder="1a2a3a"
          defaultValue={formationShareId}
        />
      </div>
      <Button type="submit">Save formation</Button>
    </form>
  );
}
