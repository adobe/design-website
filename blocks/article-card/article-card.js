/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
    const result = processDivisions($block, {
        text:       ($div) => $div.textContent,
        image:      null,
    });

    console.log(result.properties);
    $block.style.backgroundColor = result.properties.background;
    result.image.remove();

    if (!result.properties["image-side"] || result.properties["image-side"] === "left") {
        result.blockContent.prepend(result.image);
    } else {
        result.blockContent.append(result.image);
    }
    result.text.classList.add("text");
    result.image.classList.add("image");
    convertToBackground(result.image.querySelector("img"), result.image);

    /** @type {HTMLAnchorElement} */
    const link = result.text.querySelector("a");
    decorateLink(link);

    result.properties.link = link.href;
    decorateTagLink( result.text.querySelector("p:first-child"), { color: "black" } );
}

/**
 * 
 * @param {HTMLImageElement} $image 
 * @param {HTMLElement} $target 
 */
function convertToBackground($image, $target) {
    $target.style.backgroundImage = `url('${$image.src}')`;
    $image.remove();
}

/**
 * 
 * @param {HTMLAnchorElement} $el 
 */
function decorateLink($el) {
    $el.parentElement.classList.add("link-wrapper");
}

function decorateTagLink($el, _modifiers) {
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
function matchDivision($block, _divs, matcherSeed) {
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
 * 
 * @param {object} props 
 * @param {HTMLElement} $propElement  
 */
function applyProperty(props, $propElement) {
    const str = $propElement.textContent;
    if (str.indexOf(":") >= 0) {
        const parts = str.split(":");
        const propName = parts[0].toLowerCase().trim().replace(/\s/gi, "-");
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
function extractProperties($block, $propBlock) {
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
function processDivisions($block, definitions) {
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
