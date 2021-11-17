import { resolveIndex } from "./queries.js";

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
 * Retrieves the content of a metadata tag.
 * @param {string} name The metadata name (or property)
 * @returns {string} The metadata value
 */
export function getMetadata(name) {
    const attr = name && name.includes(':') ? 'property' : 'name';
    const $meta = document.head.querySelector(`meta[${attr}="${name}"]`);
    return $meta && $meta.content;
}

/**
 *
 * @param {HTMLAnchorElement} $el
 */
export function decorateLink($el) {
    $el.parentElement.classList.add("link-wrapper");
}

export function decorateTagLink($el, location, _modifiers) {
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
    return $wrap($element("a.stories-link", { attr: { href: `/stories/?tag=${location.toUpperCase()}` } }), $el);
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

export async function propertiesFromUrl( url, def ) {
    const index = await resolveIndex();
    var match = index.whereUrlMatchesPath(url);
    console.log("MATCH", match);
    if(match) {
        const result = {};
        const keys = Object.keys(def);
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let mapKey = def[key];
            if(typeof mapKey === "string") {
                result[key] = match[mapKey];
            } else {
                result[key] = match[mapKey.field] || mapKey.default;
            }
        }
        console.log("RESULT", result);
        return result;
    } else {
        return {};
    }
}

/**
 *
 * @param {HTMLDivElement} $div
 * @param {*} options
 */
export async function transformBlockWithLink( $div, def ) {
    var link = $div.querySelector("a");
    if(link) {
        var url = link.getAttribute("href");
        link.remove();
        return propertiesFromUrl(url, def);
    } else {
        return null;
    }
}

export async function transformLinks( $div, def ) {
    var results = [];
    var link = $div.querySelector("a");
    while(link) {
        var url = link.getAttribute("href");
        link.remove();
        var result = propertiesFromUrl(url, def);
        results.push( result );
    }
    return results;
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
 * @param {Array} definitions
 * @param {Object} [options]
 * @example const result = decorateDivisions($block, {
        text:       ($div) => $div.textContent,
        image:      null,
    });
 * @example decorateDivisions($block, ["image", "text"]);
 */
export function decorateDivisions($block, definitions, options) {
    var job = new DecorateDivisionsJob(definitions, options);
    return job.process($block);
}

class DecorateDivisionsJob {
    constructor(definitions, options) {
        this.$divs = [];
        if (!definitions) {
            this.definitions = [];
        } else {
            this.definitions = definitions;
        }
        if (!options) {
            this.options = {
                level: "block",
            };

        } else {
            this.options = options;
        }
    }
    process($block) {
        const results = {};
        const { definitions, options } = this;

        if (definitions.properties) {
            throw new Error(`'properties' cannot be used as a division name`);
        }
        definitions.push( this.getPropertiesDefinition() );
        this.divisionsForBlock($block, options, results);

        for (let i = 0; i < definitions.length; i++) {
            const def = definitions[i];
            const { selector, testSelector, test, name } = this.expandDefinition( def );

            // const $match = matchDivision($block, $divs, matcher, options);
            let $match = this.matchDefintion({testSelector, test});
            if($match) {
                if (name === "properties") {
                    results.properties = extractProperties($block, $match);
                } else {
                    results[name] = $match;
                    applySelectorToElement($match, selector);
                }
                const index = this.$divs.indexOf($match);
                this.$divs.splice(index, 1);
            }
        }

        return results;
    }
    /**
     * Gets the divisions to be targeted based on the target level
     * @param {*} $block
     * @param {*} options
     * @param {*} results
     * @returns
     */
    divisionsForBlock($block, options, results) {
        this.$divs = [];
        if (options.level === "block") {
            $block.querySelectorAll(":scope > div > div").forEach((div) => {
                this.$divs.push(div);
            });
            results[".block-content"] = $block.querySelector(":scope > div");
            results[".block-content"].classList.add("block-content");
        } else if (options.level === "child") {
            $block.querySelectorAll(":scope > div").forEach((div) => {
                this.$divs.push(div);
            });
        } else {
            throw new Error(`Unrecognized level: "${options.level}"`);
        }
    }

    getPropertiesDefinition() {
        return {
            name: "properties",
            testSelector: ":last-child",
            test($div) {
                return ($div.textContent.toLowerCase().indexOf("properties") === 0);
            },
        };
    }

    expandDefinition(def) {
        if(typeof def === "string") {
            return {
                selector: def,
                name: def,
                test: null,
                testSelector: null
            };
        } else {
            return {
                selector: def.selector,
                testSelector: def.testSelector,
                test: def.test,
                name: def.name,
            };
        }
    }

    matchDefintion({testSelector, test}) {
        let $match;
        for(let d = 0; d < this.$divs.length; d += 1) {
            const $divt = this.$divs[d];

            if(test || testSelector) {
                if(testSelector) {
                    if($divt.parentElement.querySelector(`:scope > ${testSelector}`) === $divt) {
                        $match = $divt;
                    } else {
                        $match = null;
                    }
                }
                if(test) {
                    if(test($divt)) {
                        $match = $divt;
                    } else {
                        $match = null;
                    }
                }
            } else {
                $match = $divt;
            }

            if ($match) {
                break;
            }
        }
        return $match;
    }
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
        const id = idResult[0].replace("#", "");
        working = working.replace(id, "");
        result.id = id;
    }
    if (working.indexOf(".") >= 0) {
        const classes = working.split(".").filter(str => !!str);
        if (tagSpecified) {
            result.tag = classes.shift();
        }
        result.classes = classes;
        working = null;
    }
    if (working && tagSpecified) {
        result.tag = working;
    }
    return result;
}

function applySelectorToElement(initialElement, selector) {
    var $el;
    const { tag, classes, id } = parseSelector(selector);
    $el = initialElement || document.createElement(tag);
    if (classes) {
        classes.forEach(cls => {
            $el.classList.add(cls);
        });
    }
    if (id) {
        $el.id = id;
    }
    return $el;
}

export function $element(selector, options, content) {
    if (!selector) {
        throw new Error(`$element requires the 1st argument, selector`);
    }
    if (arguments.length === 2 && (typeof options === "string" || options instanceof HTMLElement || options instanceof Array)) {
        content = options;
        options = {};
    }
    const $div = applySelectorToElement(null, selector);

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
                if(typeof c === "string")
                    $div.innerText+= c;
                else
                    $div.appendChild(c);
            });
        }
    }
    if (options && options.attr) {
        const keys = Object.keys(options.attr);
        for (const key of keys) {
            $div.setAttribute(key, options.attr[key]);
        }
    }

    return $div;
}


// export function $changeTag(selector, oldSelector) {
//     if (!selector) {
//         throw new Error(`$element requires the 1st argument, selector`);
//     }


//     const inner =  oldSelector.innerHtml;

//     const $div = applySelectorToElement(null, selector);
//     $div.innerHtml(inner);


//     if (arguments.length === 2 && (typeof options === "string" || options instanceof HTMLElement || options instanceof Array)) {
//         content = options;
//         options = {};
//     }

//     if (content) {
//         if (typeof content === "string") {
//             $div.innerText = content;
//         } else {
//             let contentArray;
//             if (!(content instanceof Array)) {
//                 contentArray = [content];
//             } else {
//                 contentArray = content;
//             }
//             contentArray.forEach(c => {
//                 $div.appendChild(c);
//             });
//         }
//     }
//     if (options && options.attr) {
//         const keys = Object.keys(options.attr);
//         for (const key of keys) {
//             $div.setAttribute(key, options.attr[key]);
//         }
//     }

//     return $div;
// }

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

/**
 * Iterates through the child elements of $target with function fn
 * @param {*} $target
 * @param {*} fn
 */
export function $eachChild($target, fn) {
    for (let i = 1; i < $target.children.length; i++) {
        fn($target.children.item(i));
    }
}

/**
 * Creates an additional element layer between parent and child(ren) elements
 * @param {*} $oldParent
 * @param {String} selector -- the new elm that'll be created and added between parent and children
 */
 export function $addNewLayerElm($oldParent, selector){
    let $newParent = $element(selector);
    for(let i = 1; i < $oldParent.childNodes.length; i++){
        $newParent.appendChild($oldParent.childNodes[i])
    }
    $oldParent = $oldParent.prepend($newParent);
    return $oldParent;
}

/**
 * Creates an additional element layer between parent and child elements
 * @param {*} $outerElm Outer container
 * @param {*} $innerElm Inner element
 * @param {String} selector -- the new elm that'll be created and added between parent and child
 */
 export function $addMiddleElm($outerElm, selector,$innerElm){
    // $outerElm.remove($innerElm)
    $outerElm = $outerElm.append($element(selector, $innerElm));
    return $outerElm;
}

/**
 * Move all child elements from one parent to a new parent Element
 * @param {*} $newParent Where you want the children located
 * @param {*} $oldParent Where the children are currently located
 */
 export function $relocateChildElms($newParent, $oldParent){
    for(let i = 1; i < $oldParent.childNodes.length; i++){
        $newParent.appendChild($oldParent.childNodes[i])
    }
    $newParent = $newParent.append(resolvedChildren);
    return $newParent;
}

export function $remainder($target, selector) {
    let $targetEl;
    if (typeof target === "string") {
        $targetEl = document.querySelector(target);
    } else {
        $targetEl = $target;
    }
    const $match = $targetEl.querySelector(selector);
    const remainder = [];
    $eachChild($targetEl, c => {
        if (c !== $match) {
            remainder.push(c);
        }
    });
    return remainder;
}
// Calling this function in your script will add an animation to any elements that's scrolled into view
// Add the 'js-scroll' class to any element you would like animated along with a class that contains the animation you would like.
// Currently available animations are located in styles.css
// when generating new animations you must write your selector prefaced with the scrolled class. ex .scrolled.fade-in {animation: ...}
export function $scrollAnimation() {
    const scrollElements = document.querySelectorAll(".js-scroll");
    const elementInView = (element, dividend = 1) => {
      const elementTop = element.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const elementOutofView = (element) => {
      const elementTop = element.getBoundingClientRect().top;
      return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
      );
    };

    const displayScrollElement = (element) => {
      element.classList.add("scrolled");
    };
    const hideScrollElement = (element) => {
      element.classList.remove("scrolled");
    };
    var timeOut;
    var pendingScroll = false;
    const SCROLL_THROTTLE = 100;
    const handleScrollAnimation = () => {
        if(!timeOut){
            timeOut = setTimeout(()=> {
                timeOut = null;
                if(pendingScroll){
                    pendingScroll = false;
                    handleScrollAnimation();
                }
            }, SCROLL_THROTTLE)
            scrollElements.forEach((element) => {
                if (elementInView(element, 1)) {
                displayScrollElement(element);
                } else if (elementOutofView(element)) {
                hideScrollElement(element)
                }
            })
        } else {
            pendingScroll = true;
        }

    }
    window.removeEventListener("scroll", handleScrollAnimation);
    window.addEventListener("scroll",
      handleScrollAnimation
    );
    handleScrollAnimation();

}
// export function $handleResize(){
//     window.addEventListener("resize", )
// }

/**
 * Fetches a fragment based on its reliatve page url
 * @param {*} relativePath
 * @returns
 */
export async function fetchFragment( relativePath ) {
    try {
        const url = `${location.origin}/${relativePath}.plain.html`;
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`Failed to fetch fragment: ${url}`);
        }
        return await res.text();
    } catch(err) {
        console.warn(`Fragment not found ${relativePath}`);
        console.error(err);
        return err;
    }
}


