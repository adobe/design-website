import { getRootPath } from "./scripts.js";

/**
 * fetches blog article index.
 * @returns {object} index with data and path lookup
 */

export async function fetchBlogArticleIndex() {
    const resp = await fetch(`${getRootPath()}/query-index.json`);
    const json = await resp.json();
    const byPath = {};
    json.data.forEach((post) => {
        byPath[post.path.split('.')[0]] = post;
    });
    const index = { data: json.data, byPath };
    return (index);
}

/**
 * fetches blog article index.
 * @returns {object} index with data and path lookup
 */

export async function fetchJobIndex() {
    const resp = await fetch(`/jobs/query-index.json`);
    const json = await resp.json();
    const byPath = {};
    json.data.forEach((post) => {
        byPath[post.path.split('.')[0]] = post;
    });
    const index = { data: json.data, byPath };
    return (index);
}
