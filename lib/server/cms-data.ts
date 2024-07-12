import "server-only";

export async function getCmsData() {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.CHARACTERS_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  return jsonData;
}

export async function getCharacterDetailsCmsData() {
  const jsonData = await (
    await fetch(
      `https://simplejsoncms.com/api/${process.env.CHARACTER_DETAILS_SIMPLEJSONCMS_ID}`,
    )
  ).json();
  return jsonData;
}
