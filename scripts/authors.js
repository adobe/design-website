import {
  fetchFragment,
  getMetadataFromOutsideDoc,
} from './helpers.js';

const RE_CLEAN_URL = /[^a-z0-9]/gi;
const Console = console;

export default async function lookupAuthor(name) {
  const urlName = name.replace(RE_CLEAN_URL, '-').toLowerCase();

  try {
    const wholeBio = await fetchFragment(`authors/${urlName}`, { metadata: true });
    const parser = new DOMParser();
    const parsed = parser.parseFromString(wholeBio, 'text/html');
    const position = getMetadataFromOutsideDoc('position', parsed) || getMetadataFromOutsideDoc('title', parsed);
    const image = getMetadataFromOutsideDoc('og:image', parsed);
    const bio = getMetadataFromOutsideDoc('og:description', parsed);
    return {
      bio,
      name,
      title: position,
      image,
    };
  } catch (err) {
    Console.log(`Author ${name} not found`);
    Console.error(err);
    return null;
  }
}
