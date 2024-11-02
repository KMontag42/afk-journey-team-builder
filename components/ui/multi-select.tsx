"use client";

import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

type SelectItem = {
  name: string;
  value: string;
};

type Props = {
  itemDescription: string;
  items: SelectItem[];
  callback(selected: string[]): void;
};

export default function MultiSelect({
  itemDescription,
  items,
  callback,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof items>([]);

  const handleSelect = (item: (typeof items)[number]) => {
    setSelected((prev) => {
      if (prev.some((_item) => item.value === _item.value)) {
        return prev.filter((_item) => item.value !== _item.value);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleRemove = (item: (typeof items)[number]) => {
    setSelected((prev) => prev.filter((_item) => item.value !== _item.value));
  };

  useEffect(() => {
    callback(selected.map((x) => x.value));
  }, [selected, callback]);

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected.length > 0
              ? `${selected.length} selected`
              : `Select ${itemDescription}...`}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="md:w-[40vw] p-0">
          <Command>
            <CommandInput placeholder={`Search ${itemDescription}...`} />
            <CommandList>
              <CommandEmpty>No {itemDescription} found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selected.some((_item) => item.value === _item.value)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <Badge key={item.value} variant="secondary">
            {item.name}
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-4 w-4 p-0"
              onClick={() => handleRemove(item)}
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
