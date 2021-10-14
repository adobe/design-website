/**
 * There's a button element that's used in multiple places
 * Initially it'll just be an unfilled, outlined button
 * By default/ideally, it should be placement agnostic and not interfere with
 * surrounding elements
 */

 import {
    wrapWithElement,
    $element,
} from "../../scripts/helpers.js";

/**
 * @param {HTMLElement} $block
 * @param {String} innerText
 * @param {any} [action]
 * @param {Array<string> | string} [clasList]
 */
export default function addButton(innerText, action, classList) {
  let button = document.createElement("button")
  button.innerText = {innerText }// {HTMLElement}
}