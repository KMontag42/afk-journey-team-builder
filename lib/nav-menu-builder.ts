export function getSections(baseUrl: string, json: JSON): any[] {
  const sections = Object.entries(json).map(
    ([section, data]: [string, any]) => {
      const listItems = Object.entries(data).map(
        ([key, data]: [string, any]) => ({
          title: data.title,
          href: `${baseUrl}/${section}/${key}`,
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
