/**
 * 
 * @param {HTMLImageElement} $image 
 * @param {HTMLElement} $target 
 */
export function convertToBackground($image, $target) {
    $target.style.backgroundImage = `url('${$image.src}')`;
    $image.remove();
}

/**
 * 
 * @param {HTMLAnchorElement} $el 
 */
export function decorateLink($el) {
    $el.parentElement.classList.add("link-wrapper");
}

export function decorateTagLink($el, _modifiers) {
    let modifiers;
    if (!_modifiers) {
        modifiers = {};
    } else {
        modifiers = _modifiers;
    }
    $el.classList.add("tag-link");
    if (modifiers.color === "black") {
        $el.classList.add("black");
    }
}

/**
 *
 * @param {HTMLElement} $block
 * @param {string} partialSelector
 * @param {function} fn
 */
export function matchDivision($block, _divs, matcherSeed) {
    let match;
    let $divs;
    if (!(_divs instanceof Array)) {
        $divs = [$divs];
    } else {
        $divs = _divs;
    }
    // Devs can provide one part of a matcher, or a whole matcher
    // We resolve it to a normal matcher
    const matcher = {};
    if (typeof matcherSeed === "string") {   
        matcher.selector = matcherSeed;
    } else if (typeof matcherSeed === "function") {
        matcher.test = matcherSeed;
    } else if (typeof matcherSeed === "object") {
        Object.assign(matcher, matcherSeed);
    } else if (!matcherSeed) {
        // If null, simply return the first div
        return $divs.shift();
    }

    for (let i = 0; i < $divs.length; i++) {
        const $div = $divs[i];
        let qualified = true;
        if (matcher.selector) {
            qualified = ($div === $block.querySelector(`:scope > div > ${matcher.selector}`));
        }
        if (qualified && matcher.test) {
            qualified = matcher.test($div);
        }
        if (qualified) {
            $divs.splice(i, 1);
            match = $div;
            break;
        }
    }

    return match;
}

/**
 * Returns a Javascript/CSS safe property name
 * @param {string} str 
 * @returns {string}
 */
export function normalizePropertyName(str) {
    return str.toLowerCase().trim().replace(/\s/gi, "-").replace(/[^\w\d_-]/gi, "");
}

export function normalizePropertyValue(str) {
    return str.toLowerCase().trim();
}

/**
 * 
 * @param {object} props 
 * @param {HTMLElement} $propElement  
 */
export function applyProperty(props, $propElement) {
    const str = $propElement.textContent;
    if (str.indexOf(":") >= 0) {
        const parts = str.split(":");
        const propName = normalizePropertyName(parts[0]);
        props[propName] = parts[1].trim();
    } else {
        // Boolean switches don't have to follow a key-value pattern
        const propName = str.toLowerCase().trim().replace(/\s/gi, "-");
        props[propName] = str;
    }
}

/**
 *
 * @param {HTMLElement} $block
 */
export function extractProperties($block, $propBlock) {
    const props = {};
    let $resolvedPropBlock;
    if (!$propBlock) {
        $resolvedPropBlock = matchDivision($block, {
            selector: ":last-child",
            test: ($div) => $div.textContent.toLowerCase().indexOf("properties") === 0
        });
    } else {
        $resolvedPropBlock = $propBlock;
    }

    if ($resolvedPropBlock) {
        // Start at 1 since the first element is the "properties" indicator
        for (let i = 1; i < $resolvedPropBlock.children.length; i++) {
            applyProperty(props, $resolvedPropBlock.children.item(i));
        }
        $resolvedPropBlock.remove();
    }
    return props;
}

/**
 *
 * @param {HTMLElement} $block
 * @param {object} definitions
 */
export function processDivisions($block, definitions) {
    const results = {};
    if (definitions.properties) {
        throw new Error(`'properties' cannot be used as a division name`);
    }
    definitions.properties = {
        selector: ":last-child",
        test($div) {
            return ($div.textContent.toLowerCase().indexOf("properties") === 0);
        },
    };
    const names = Object.keys(definitions).sort((n1, n2) => {
        // Any falsey values should be processed at the end
        // Since the falsies are meant to absorb "the remainder"
        const v1 = definitions[n1] ? 0 : 1;
        const v2 = definitions[n2] ? 0 : 1;
        return v1 - v2;
    }); 

    const $divs = [];
    $block.querySelectorAll(":scope > div > div").forEach((div) => {
        $divs.push(div);
    });
    results.blockContent = $block.querySelector(":scope > div");
    results.blockContent.classList.add("block-content");
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const matcher = definitions[name];
        const $match = matchDivision($block, $divs, matcher);
        if ($match) {
            if (name === "properties") {
                results.properties = extractProperties($block, $match);
            } else {
                results[name] = $match;
            }
        }
    }

    return results;
}
