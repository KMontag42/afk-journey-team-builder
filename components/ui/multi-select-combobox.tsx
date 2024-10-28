"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SelectItem = {
  value: string;
  label: string;
};
type Props = {
  items: SelectItem[];
  itemName: string;
};
export default function MultiSelectCombobox({ items, itemName }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectItem[]>([]);

  const sortedItems = items.sort((a, b) => {
    const aSelected = selected.includes(a);
    const bSelected = selected.includes(b);

    return Number(bSelected) - Number(aSelected);
  });

  const handleSelect = (framework: SelectItem) => {
    setSelected((prev) => {
      if (prev.some((item) => item.value === framework.value)) {
        return prev.filter((item) => item.value !== framework.value);
      } else {
        return [...prev, framework];
      }
    });
  };

  return (
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
            : `Select ${itemName}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />{" "}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={`Search ${itemName}...`} />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {sortedItems.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={() => handleSelect(framework)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.some((item) => item.value === framework.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
