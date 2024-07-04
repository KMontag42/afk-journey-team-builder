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

type SaveButtonProps = {
  formation: string[];
  artifact: string;
  layout: number;
  user: { id: string };
};

export default function SaveButton({
  formation,
  artifact,
  layout,
  user,
}: SaveButtonProps) {
  const [open, setOpen] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const { name } = e.target as typeof e.target & {
      name: { value: string };
    };

    if (formation.filter((x) => x != "").length === 0) {
      toast.error("Formation is empty!");
      setOpen(false);
      track("formation_save_error", {
        error: "Formation is empty",
      });
      return;
    }

    setOpen(false);

    try {
      await fetch("/api/formations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formation,
          artifact,
          layout: layout.toString(),
          user_id: user.id,
          name: name.value,
        }),
      });

      toast.success("Formation saved!");
      track("formation_saved", {
        formation: formation.join(","),
        artifact,
        layout,
        user_id: user.id,
        name: name.value,
      });
    } catch (error: any) {
      toast.error("Failed to save formation!");
      track("formation_save_error", {
        error,
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
          <SaveFormationForm className="px-4" onSubmit={handleSave} />
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
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn("grid items-center gap-4", className)}
      onSubmit={onSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Formation Name</Label>
        <Input type="text" id="name" placeholder="f2p Team" required />
      </div>
      <Button type="submit">Save formation</Button>
    </form>
  );
}
