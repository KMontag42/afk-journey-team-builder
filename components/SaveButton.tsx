'use client';

import { FormEvent, useState } from "react";

import { Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type SaveButtonProps = {
  formation: string[];
  spell: string;
  layout: number;
  user: { id: string };
  className?: string;
};

export default function SaveButton({ formation, spell, layout, user, className }: SaveButtonProps) {
  const [open, setOpen] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    const { name, tag } = e.target as typeof e.target & {
      name: { value: string };
      tag: { value: string };
    };

    await fetch("/api/formations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formation: formation,
        spell: spell,
        layout: layout.toString(),
        user_id: user.id,
        name: name.value,
        tag: tag.value,
      }),
    });

    toast.success("Formation saved!");
    setOpen(false);
  }

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
            Save this formation with a name, description, and tag.
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
  )
}
 
function SaveFormationForm({ className, onSubmit }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-center gap-4", className)} onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="name">Formation Name</Label>
        <Input type="text" id="name" placeholder="Good Team" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tags">Tag</Label>
        <Input type="text" id="tag" placeholder="abyss:450" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}

