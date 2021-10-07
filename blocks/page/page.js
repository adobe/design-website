import { processDivisions, normalizePropertyName } from "../../scripts/helpers.js";
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
        const pageClass = normalizePropertyName(`page-${resolvedName}`);
        document.body.classList.add(pageClass);
    }
}

export default function decorate($block) {
    const { properties } = processDivisions($block, null);
    PagePropertiesController.setProperties( properties );

    if (properties.type) {
        const pageTypeClass = `page-type-${normalizePropertyName(properties.type)}`;
        document.body.classList.add(pageTypeClass);
    }
    applyPathClassesToPage({ name: properties.name });
    
    function moveHeaderContent() {
        const page = document.querySelector(".block.page");
        const header = document.querySelector(".block.header");
        const section = document.querySelector(".section-wrapper");
        const container = document.querySelector(".section-wrapper div:first-child");
        const newDiv = document.createElement("div");
        section.insertBefore(newDiv, container);

        container.classList.add("content");
        newDiv.appendChild(page);
        newDiv.appendChild(header);

        const picture = header.querySelector("picture");
        picture.classList.add("header-image")
        container.prepend(picture);
    }
      
    moveHeaderContent();
}
