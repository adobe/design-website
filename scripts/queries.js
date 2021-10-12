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

export async function fetchIndex() {
    const resp = await fetch(`/query-index.json`);
    const json = await resp.json();
    const byType = {
        jobs: [],
        stories: [],
    };
    json.data.forEach((post) => {
        if ( post.path.indexOf("/jobs") === 0) {
            byType.jobs.push(post);
        } else if ( post.path.indexOf("/stories") === 0) {
            byType.stories.push(post);
        }
    });
    const index = { data: json.data, byType };
    return (index);
}
