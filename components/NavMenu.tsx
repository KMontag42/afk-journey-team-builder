"use server";

import React from "react";
import { ListItem } from "@/components/ui/list-item";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { NavMenuItem, NavMenuSection } from "@/lib/nav-menu-builder";

export default async function NavMenu({
  sections,
}: {
  sections: NavMenuSection[];
}) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="grid lg:grid-flow-col justify-items-center">
        {sections.map((section) => (
          <NavigationMenuItem key={section.name}>
            <NavigationMenuTrigger>{section.name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {section.items.map((page: NavMenuItem) => (
                  <ListItem
                    key={page.title}
                    title={page.title}
                    href={page.href}
                  >
                    {page.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
