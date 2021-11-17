import { fetchFragment } from "./helpers.js";

const RE_CLEAN_URL = /[^a-z0-9]/gi;

export async function lookupAuthor(name) {
    const urlName = name.replace(RE_CLEAN_URL,"-").toLowerCase();

    try {
        const bio = await fetchFragment(`authors/${urlName}`);

        return {
            bio,
            name: name,
            title: 'Director of Examples',
            image: './media_16fd3a6e96f49f43ba7d3ced9ec935ed493b7a305.png?width=750&amp;format=webply&amp;optimize=medium'
        }
    } catch(err) {
        console.log(`Author ${name} not found`);
        console.error(err);
        return null;
    }
}