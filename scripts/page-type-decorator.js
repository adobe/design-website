import { resolvePageProperties } from "./page-properties.js";

const DECORATORS = [];

export function addPageTypeDecorator( options, decorator ) {
    DECORATORS.push({ options, decorator });
}

export function runPageTypeDecorators() {
    resolvePageProperties(properties => {
        try {
            DECORATORS.forEach(pageMapping => {
                let match = false;
                let testCount = 0;
                const { pathname } = location;
                const opts = pageMapping.options;
                const name = opts.path || opts.type || opts.name;
                if (opts.path) {
                    testCount++;
                    if (opts.path.indexOf("*") >= 0) {
                        // Match nested paths
                        const testPath = opts.path.replace("*", "");
                        const contains = pathname.indexOf(testPath) >= 0;
                        const longer = pathname.length > testPath.length;
                        match = (contains && longer);
                    } else {
                        // Match exact path
                        match = pathname.indexOf(opts.path) >= 0;
                    }
                }  
                if (opts.type) {
                    testCount++;
                    match = opts.type === properties.type;
                }
                if (opts.test) {
                    testCount++;
                    match = opts.test(properties);
                }
                if (testCount > 1) {
                    console.warn("PageMapping: ", pageMapping);
                    throw new Error(`Page Type Decorator options should only specify ONE of path, type, or test`);
                } else if (testCount === 0) {
                    console.warn("PageMapping: ", pageMapping);
                    throw new Error(`Page Type decorator options must include a path, type, or test property`);
                }
                
                if (match) {
                    console.log(`Decorate page type ${name}`);
                    const main = document.querySelector("main");
                    pageMapping.decorator(main);
                }
            });
        } catch (err) {
            console.warn("An error occurred while decorating page by type");
            console.error(err);
        }
    });
}

