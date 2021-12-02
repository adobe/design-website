import { fetchFragment, getMetadata, getMetadataFromOutsideDoc } from "./helpers.js";

const RE_CLEAN_URL = /[^a-z0-9]/gi;

export async function lookupAuthor(name) {
    const urlName = name.replace(RE_CLEAN_URL,"-").toLowerCase();

    try {
        const bio = await fetchFragment(`authors/${urlName}`,{metadata: true});
        let parser = new DOMParser();
        let parsed = parser.parseFromString(bio, 'text/html')
        const position = getMetadataFromOutsideDoc('position',parsed) || getMetadataFromOutsideDoc('title',parsed);
        const image = getMetadataFromOutsideDoc('og:image',parsed);
        
        return {
            bio,
            name,
            title: position,
            image,
        }
    } catch(err) {
        console.log(`Author ${name} not found`);
        console.error(err);
        return null;
    }
}