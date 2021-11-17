import { getRootPath } from "./scripts.js";

class QueryIndex {
    constructor( index ) {
        this.index = index;
    }
    findRecord( fn ) {
        return this.index.fullindex.data.find(fn);
    }
    whereFieldContains(prop, val) {
        return this.findRecord((rec) => {
            if(typeof rec[prop] === "string") {
                return rec[prop].indexOf(val) >= 0;
            } else {
                return rec[prop] === val;
            }
        });
    }
    whereUrlMatchesPath(url) {
        return this.findRecord((rec) => {
            return url.indexOf( rec.path ) >= 0;
        });
    }
}

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

export async function fetchIndex( options ) {
    const resp = await fetch(`/query-index.json`);
    const json = await resp.json();

    const index = json;
    return (index);
}

let cachedJson = null;
let cachedQueryIndex = null;
/**
 * Resolves the index data, or re-uses it if its already been queried on the page
 * @param {*} options
 * @returns {QueryIndex}
 */
export async function resolveIndex( options ) {
    if(!options) {
        options = {};
    }
    if(!("force" in options)) {
        options.force = false;
    }
    if(!cachedJson) {
        cachedJson = await fetchIndex();
        cachedQueryIndex = new QueryIndex(cachedJson);
    }
    return cachedQueryIndex;
}