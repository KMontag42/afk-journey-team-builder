export function getSections(baseUrl: string, json: JSON): any[] {
  const sections = Object.entries(json).map(([key, data]: [string, any]) => {
    const listItems = Object.entries(data).map(
      ([key, data]: [string, any]) => ({
        title: data.title,
        href: baseUrl + key,
        description: data.description,
      }),
    );
    return {
      name: key.charAt(0).toUpperCase() + key.slice(1),
      items: listItems,
    };
  });

  return sections;
}
