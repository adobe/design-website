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

let defaultAction = () => {
  console.log( "button.js: Button clicked, but no action set ")
}

/**
 * @param {String} [innerText]
 * @param {any} [action]
 * @param {Array<string> | string} [classList]
 * @param {string} [textColor] CSS available colors, ie: 'white', '#000', 'rgb(0,100,0)'
 * @returns {HTMLButtonElement} button
 */
export default function addButton(
  innerText = 'Missing Text',
  action = defaultAction,
  classList = 'unfilled',
  textColor = 'white',
) {
  /** Normalize class list to be a string: */
  if(!!classList && typeof classList === 'array') classList.join(" ");

  let button = document.createElement("button");

  button.addEventListener("click", action)
  button.innerText = innerText;
  button.classList = classList += " gen";
  button.style= `--btn-color: ${textColor}; margin-left: .5em;`;

  return button;
}