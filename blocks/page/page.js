import { convertToBackground, decorateLink, decorateTagLink, processDivisions, normalizePropertyValue, normalizePropertyName } from "../../scripts/helpers.js";

const PagePropertiesController = {
    callbacks: [],
    ready: false,
    properties: null,
    setProperties(props) {
        PagePropertiesController.properties = props;
        PagePropertiesController.ready = true;
        console.log("Page Properties:", this.properties);
        PagePropertiesController.runCallbacks();
    },
    runCallbacks() {
        while ( PagePropertiesController.callbacks.length > 0) {
            const cb = PagePropertiesController.callbacks.shift();
            cb(PagePropertiesController.properties);
        }
    },
};
export const resolvePageProperties = function resolvePageProperties(callback) {
    if (PagePropertiesController.ready) {
        callback(PagePropertiesController.properties);
    } else {
        PagePropertiesController.callbacks.push(callback);
    }
};
window.resolvePageProperties = resolvePageProperties;

function applyPathClassesToPage({ name }) {
    const parts = location.pathname.split("/");
    for (let p = 0; p < parts.length - 1; p++) {
        const part = normalizePropertyName(parts[p]);
        if (part) {
            const pathClass = `path-${part}`;
            document.body.classList.add(pathClass);
        }
    }
    if (name || parts.length > 0) {
        const resolvedName = name || parts[ parts.length - 1];
        const pageClass = normalizePropertyName(`page-${resolvedName}`);
        document.body.classList.add(pageClass);
    }
}

export default function decorate($block) {
    const result = processDivisions($block, {});
    PagePropertiesController.setProperties( result.properties );

    if (result.properties.type) {
        const pageTypeClass = `page-type-${normalizePropertyName(result.properties.type)}`;
        document.body.classList.add(pageTypeClass);
    }
    applyPathClassesToPage({ name: result.properties.name });
}