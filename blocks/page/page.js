import { convertToBackground, decorateLink, decorateTagLink, processDivisions, normalizePropertyValue, normalizePropertyName } from "../../scripts/helpers.js";

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
    console.log("Page Properties:", result.properties);
    if (result.properties.type) {
        const pageTypeClass = `page-type-${normalizePropertyName(result.properties.type)}`;
        document.body.classList.add(pageTypeClass);
    }
    applyPathClassesToPage({ name: result.properties.name });
}
