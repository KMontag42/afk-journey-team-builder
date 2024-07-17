export type NavMenuSection = {
  name: string;
  items: NavMenuItem[];
};

export type NavMenuItem = {
  title: string;
  href: string;
  description: string;
};

export function getSections(baseRoute: string, json: JSON): NavMenuSection[] {
  const sections = Object.entries(json).map(
    ([section, data]: [string, any]) => {
      const listItems = Object.entries(data).map(
        ([key, data]: [string, any]) => ({
          title: data.title,
          href: `${baseRoute}/${section}/${key}`,
          description: data.description,
        }),
      );
      return {
        name: section.charAt(0).toUpperCase() + section.slice(1),
        items: listItems,
      };
    },
  );

  return sections;
}
