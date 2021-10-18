const RE_CLEAN_URL = /[^a-z0-9]/gi;

export async function lookupAuthor(name) {
    const urlName = name.replace(RE_CLEAN_URL,"-").toLowerCase();
    const url = `http://localhost:3000/authors/${urlName}.plain.html`;
    try {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Failed to fetch ${url}`);
        }
        const bio = await res.text();

        return {
            bio,
            name: 'John Doe',
            title: 'Director of Examples',
            image: './media_16fd3a6e96f49f43ba7d3ced9ec935ed493b7a305.png?width=750&amp;format=webply&amp;optimize=medium'
        }
    } catch(err) {
        console.log(`Author ${name} not found`)
        console.error(err);
        return null;
    }
}