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
    return $el;
}

/**
 *
 * @param {HTMLElement} $block
 * @param {string} partialSelector
 * @param {function} fn
 */
export function matchDivision($block, _divs, matcherSeed, options) {
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
            if (options.level === "block") {
                qualified = ($div === $block.querySelector(`:scope > div > ${matcher.selector}`));
            } else if (options.level === "child") {
                qualified = ($div === $block.querySelector(`:scope > ${matcher.selector}`));
            }
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

function arrayToDefinitions( arr ) {
    const def = {};
    for (let i = 0; i < arr.length; i++) {
        const name = arr[i];
        def[name] = `:nth-child(${i + 1})`;
    }
    return def;
}

/**
 * You can divide a block into multiple "divisions" (divs).
 * This originates in the document as columns in the table.
 * You can either return a fully-qualified definition object;
 * OR you can return just the selector string that it expects to find;
 * OR you can return an array of names if the beahvior is defined only by their order;
 * OR you can return null if the element is the "remainder" after others are specified;
 * OR if you only want the properties column and don't care about the rest, omit the definitions
 * @param {HTMLElement} $block
 * @param {object} definitions
 * @example const result = processDivisions($block, {
        text:       ($div) => $div.textContent,
        image:      null,
    });
 * @example processDivisions($block, ["image", "text"]);
 */
export function processDivisions($block, definitions, options) {
    const results = {};
    if (!definitions) {
        definitions = {};
    }
    if (!options) {
        options = {
            level: "block",
        };
    }
    if (definitions instanceof Array) {
        definitions = arrayToDefinitions(definitions);
    }
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
    if (options.level === "block") {
        $block.querySelectorAll(":scope > div > div").forEach((div) => {
            $divs.push(div);
        });
        results.blockContent = $block.querySelector(":scope > div");
        results.blockContent.classList.add("block-content");
    } else if (options.level === "child") {
        $block.querySelectorAll(":scope > div").forEach((div) => {
            $divs.push(div);
        });
    } else {
        throw new Error(`Unrecognized level: "${options.level}"`);
    }

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const matcher = definitions[name];
        const $match = matchDivision($block, $divs, matcher, options);
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

const RE_ID = /#(\w-?)+/i;
function parseSelector(selector) {
    let working = selector;
    let tagSpecified = true;
    const result = {
        tag: null,
        classes: [],
        id: null,
    };
    if (working.indexOf("#") === 0 || working.indexOf(".") === 0) {
        result.tag = "div";
        tagSpecified = false;
    }
    const idResult = RE_ID.exec(working);
    if (idResult) {
        const id = idResult[0];
        working = working.replace(id, "");
        result.id = id;
    }
    if (working.indexOf(".") >= 0) {
        const classes = working.split(".").filter(str => !!str);
        if (tagSpecified) {
            result.tag = classes.shift();
        }
        result.classes = classes;
    }

    return result;
}

export function $element(selector, options, content) {
    if (!selector) {
        throw new Error(`$element requires the 1st argument, selector`);
    }
    if (arguments.length === 2 && (typeof options === "string" || options instanceof HTMLElement || options instanceof Array)) {
        content = options;
        options = {};
    }
    const { tag, classes, id } = parseSelector(selector);
    const $div = document.createElement(tag);

    if (classes) {
        classes.forEach(cls => {
            $div.classList.add(cls);
        });
    }
    if (id) {
        $div.id = id;
    }
    if (content) {
        if (typeof content === "string") {
            $div.innerText = content;
        } else {
            let contentArray;
            if (!(content instanceof Array)) {
                contentArray = [content];
            } else {
                contentArray = content;
            }
            contentArray.forEach(c => {
                $div.appendChild(c);
            });
        }
    }

    return $div;
}

export function wrapWithElement($target, $wrap) {
    $wrap.appendChild($target);
    return $wrap;
}

/**
 * 
 * @param {*} $parent 
 * @param {*} children 
 * @returns 
 * @example 
 * $wrap($element(".container"), [
 *  myHeader,
 *  $element("#account"),
 *  myDiv
 * ])
 */
export function $wrap($parent, children) {
    let resolvedChildren = [];
    if (!(children instanceof Array)) {
        resolvedChildren = [children];
    } else {
        resolvedChildren = children;
    }
    resolvedChildren.forEach($child => {
        if ($child.parentElement) {
            $child.remove();
        }
        $parent.appendChild($child);
    });
    return $parent;
}

export function $remainder($target, selector) {
    const $match = $target.querySelector(selector);
    const remainder = [];
    $target.children.forEach(c => {
        if (c !== $match) {
            remainder.push(c);
        }
    });
    return remainder;
}
