import { decorateDivisions, normalizePropertyName } from "../../scripts/helpers.js";
import { PagePropertiesController } from "../../scripts/page-properties.js";

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
        if(resolvedName) {
            const pageClass = normalizePropertyName(`page-${resolvedName}`);
            document.body.classList.add(pageClass);
        }
    }
}

export default function decorate($block) {
    const { properties } = decorateDivisions($block, null);
    PagePropertiesController.setProperties( properties );

    if (properties.type) {
        const pageTypeClass = `page-type-${normalizePropertyName(properties.type)}`;
        document.body.classList.add(pageTypeClass);
    }
    applyPathClassesToPage({ name: properties.name });
}
