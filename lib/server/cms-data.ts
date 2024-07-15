import "server-only";

export async function getCmsData() {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.CHARACTERS_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  return jsonData;
}

export async function getGuidePages() {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.GUIDES_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  return jsonData["guides"];
}

export async function getGuideContent(section: string, name: string) {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.GUIDES_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  return jsonData["guides"][section][name]?.content;
}
