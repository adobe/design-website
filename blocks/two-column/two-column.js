import { decorateDivisions } from "../../scripts/helpers.js";
/**
 *
 * @param {HTMLElement} $block
 */
export default function decorate($block) {
    const { properties } = decorateDivisions($block);
    const $col1 = $block.querySelector(":scope > div > div:first-child");
    const $col2 = $block.querySelector(":scope > div > div:nth-child(2)");

    const targets1 = childrenToArray($col1);
    const targets2 = childrenToArray($col2);

    $col1.innerHTML = "";
    $col2.innerHTML = "";

    processColumn($col1, targets1);
    processColumn($col2, targets2);
}

/**
 *
 * @param {HTMLElement} $columnElement
 * @param {string[]} columnTargets
 */
function processColumn($columnElement, columnTargets) {
    columnTargets.forEach(targetString => {
        const $target = getColumnTarget(targetString);
        if($target) {
            $target.remove();
            $columnElement.append($target);
        } else {
            console.warn(`two-column, no such target: `, targetString);
        }
    });
}

function getColumnTarget(targetString) {
    if(targetString.indexOf('--') === 0) {
        return document.querySelector(`.${targetString}`);
    } else {
        return document.querySelector(`.${targetString}.block`);
    }
}

/**
 *
 * @param {HTMLElement} $element
 * @returns {string[]}
 */
function childrenToArray($element, options) {
    if (!options) {
        options = {
            normalize: true,
        };
    }
    let arr = [];
    if ($element.children.length === 0) {
        arr.push($element.textContent);
    } else {
        for (let i = 0; i < $element.children.length; i++) {
            const child = $element.children.item(i);
            arr.push(child.textContent);
        }
    }

    if (options.normalize) {
        arr = arr.map(item => item.toLowerCase().replace(/\s/gi, "-"));
    }
    return arr;
}