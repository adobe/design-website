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

interface params {
  innerText: string
  action?: any
  clasList?: Array<string> | string
}

/**
 * @param {HTMLElement} $block
 */

 tagName: K, options?: ElementCreationOptions
export default function addButton(innerText: any, action?: any, classList?: Array<String> | String) {
  let button = document.createElement("button")
  button.innerText = {innerText }// {HTMLElement}
}