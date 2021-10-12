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
                if (pageMapping.options.path) {
                    testCount++;
                    match = location.pathname.indexOf(pageMapping.options.path) >= 0;
                }  
                if (pageMapping.options.type) {
                    testCount++;
                    match = pageMapping.options.type === properties.type;
                }
                if (pageMapping.options.test) {
                    testCount++;
                    match = pageMapping.options.test(properties);
                }
                if (testCount > 1) {
                    console.warn("PageMapping: ", pageMapping);
                    throw new Error(`Page Type Decorator options should only specify ONE of path, type, or test`);
                } else if (testCount === 0) {
                    console.warn("PageMapping: ", pageMapping);
                    throw new Error(`Page Type decorator options must include a path, type, or test property`);
                }
                
                if (match) {
                    console.log(`Decorate page type ${pageMapping.condition}`);
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

