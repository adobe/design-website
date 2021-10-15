import {$element, $moveTo} from "../../scripts/helpers.js";

export default function decorate($block) {
    const $author = $block.querySelectorAll(":scope > div");
    var authorContainer = $block.querySelector(".author-bio")
    var section = document.querySelector(".section-wrapper")
    for (const author of $author) {
        author.querySelector("div:nth-child(1) > div:nth-child(1) > p > picture > img").classList.add("author-image");
        author.querySelector("div:nth-child(1) > div:nth-child(2)").classList.add("author-info");
        author.querySelector("div > div:nth-child(1) > div:nth-child(1)").classList.add("author-name");
        author.querySelector(".author-name > h2").classList.add("name");
        author.querySelector(".author-name > h3").classList.add("title");
    }
    document.body.insertBefore($block, document.querySelector("#global-footer"))
}