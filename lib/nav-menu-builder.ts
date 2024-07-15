export function getSections(baseUrl: string, json: JSON): any[] {
  let sections: {
    name: string;
    items: { title: string; href: string; description: string }[];
  }[] = [];
  let listItems: { title: string; href: string; description: string }[] = [];

  Object.entries(json).map(([key, data]: [string, any]) => {
    listItems = [];
    Object.entries(data).map(([key, data]: [string, any]) => {
      listItems.push({
        title: data.title,
        href: baseUrl + key,
        description: data.description,
      });
    });
    sections.push({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      items: listItems,
    });
  });
  return sections;
}
