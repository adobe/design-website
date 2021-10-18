export async function lookupAuthor(name) {
    const url = `http://localhost:3000/authors/example-author.plain.html`;
    const res = await fetch(url);
    const bio = await res.text();

    return {
        bio,
        name: "John Doe",
        title: "Director of Examples",
        image: './media_16fd3a6e96f49f43ba7d3ced9ec935ed493b7a305.png?width=750&amp;format=webply&amp;optimize=medium'
    }
}