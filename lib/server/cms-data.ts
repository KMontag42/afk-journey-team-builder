export async function getCmsData() {
    const jsonData = await (
        await fetch(`https://simplejsoncms.com/api/${process.env.CHARACTERS_SIMPLEJSONCMS_ID}`)
    ).json();
    return jsonData;
}