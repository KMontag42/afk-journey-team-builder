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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { track } from "@vercel/analytics";
import { useRouter } from "next/navigation";

type SaveButtonProps = {
  formation: string[];
  artifact: string;
  layout: number;
  user: { id: string };
  allTags: string[];
  name?: string;
  id?: number;
  tags?: string[];
};

export default function SaveButton({
  formation,
  artifact,
  layout,
  user,
  name,
  id,
  tags,
  allTags,
}: SaveButtonProps) {
  // TODO: if we ever decide to support multiple tags, this is where we'd need to change
  const tag = tags?.[0];
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState(tag);

  const availableTags = allTags.map((x) => ({ name: x, value: x }));

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

    const formationData = {
      formation,
      artifact,
      layout: Math.trunc(layout),
      user_id: user.id,
      name: name.value,
      tags: [selectedTag],
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
            availableTags={availableTags}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
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
  availableTags,
  selectedTag,
  setSelectedTag,
}: React.ComponentProps<"form"> & {
  availableTags: { name: string; value: string }[];
  selectedTag: string | undefined;
  setSelectedTag: (tag: string) => void;
}) {
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
          placeholder="f2p Team"
          defaultValue={name}
          required
        />
        <Label htmlFor="tags">Tag</Label>
        <Select onValueChange={setSelectedTag} value={selectedTag}>
          <SelectTrigger>
            <SelectValue placeholder="Select tag..." />
          </SelectTrigger>
          <SelectContent>
            {availableTags.map((at) => (
              <SelectItem key={at.value} value={at.value}>
                {at.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Save formation</Button>
    </form>
  );
}
