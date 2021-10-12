import { resolvePageProperties } from "./page-properties.js";

const DECORATORS = [];

export function addPageTypeDecorator( condition, decorator ) {
    DECORATORS.push({ condition, decorator });
}

export function runPageTypeDecorators() {
    resolvePageProperties(properties => {
        try {
            DECORATORS.forEach(pageMapping => {
                let match = false;
                if (typeof pageMapping.condition === "string") {
                    match = pageMapping.condition === properties.type;
                } else {
                    match = pageMapping.condition(properties);
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

