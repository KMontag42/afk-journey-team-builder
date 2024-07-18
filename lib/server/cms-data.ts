import "server-only";

export async function getCmsData() {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.CHARACTERS_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  return jsonData;
}

export async function getGuideHomePage() {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.GUIDES_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  const banners = Object.entries(jsonData["home"]).map(
    ([key, data]: [string, any]) => ({
      key: key,
      guideLink: data["guideLink"],
      imageLink: data["imageLink"],
    }),
  );

  console.log(banners);
  return banners;
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
