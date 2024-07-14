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
  return jsonData;
}

export async function getGuideContent(name: string) {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.GUIDES_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  let guideName = decodeURI(name);

  let content = "";
  Object.keys(jsonData).forEach((key) => {
    if (jsonData[key][guideName]) {
      content = jsonData[key][guideName].content;
    }
  });
  return content;
}
