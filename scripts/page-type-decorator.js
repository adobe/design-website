import { loadCSS } from "./importer.js";
import { resolvePageProperties } from "./page-properties.js";

const DECORATORS = [];

export function addPageTypeDecorator( name, options ) {
    DECORATORS.push({ name, options });
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} $block The block element
 */
 export async function loadPageType(name) {
    try {
        const mod = await import(`/pages/${name}/${name}.js`);
        if (mod.default) {
            console.log(`Decorate page type ${name}`);
            const main = document.querySelector("main");
            await mod.default(main);
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`failed to load module for page type: ${name}`);
        console.error(err);
    }
    const pageTypeClass = `page-type-${name}`;
    document.body.classList.add(pageTypeClass);
    // applyPathClassesToPage({ name: properties.name });
    loadCSS(`/pages/${name}/${name}.css`);
}

export async function runPageTypeDecorators() {
    try {
        for(let i = 0; i < DECORATORS.length; i += 1) {
            const pageMapping = DECORATORS[i];
            let match = false;
            let testCount = 0;
            const { pathname } = location;
            const opts = pageMapping.options;
            const { name } = pageMapping;
            if (opts.path) {
                testCount++;
                if (opts.path.indexOf("*") >= 0) {
                    // Match nested paths
                    const testPath = opts.path.replace("*", "");
                    const contains = pathname.indexOf(testPath) >= 0;
                    const longer = pathname.length > testPath.length;
                    match = (contains && longer);
                } else {
                    // Match exact path without the last slash
                    const trailing = /\/$/;
                    match = (pathname.replace(trailing, "") === opts.path.replace(trailing, ""));
                }
            }
            if (opts.type) {
                testCount++;
                // match = opts.type === properties.type;
            }
            if (opts.test) {
                testCount++;
                // match = opts.test(properties);
            }
            if (testCount > 1) {
                console.warn("PageMapping: ", pageMapping);
                throw new Error(`Page Type Decorator options should only specify ONE of path, type, or test`);
            } else if (testCount === 0) {
                console.warn("PageMapping: ", pageMapping);
                throw new Error(`Page Type decorator options must include a path, type, or test property`);
            }

            if (match) {
                return loadPageType(name);
            }
        }
    } catch (err) {
        console.warn("An error occurred while decorating page by type");
        console.error(err);
    }
}
