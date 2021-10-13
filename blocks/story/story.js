import {$wrap, $element} from "../../scripts/helpers.js";

export default function decorate($block) {

    var mainContent = $block.querySelector("body > main > div > div.content");

    const $stories = $block.querySelectorAll(':scope > div');
    for (const story of $stories) {
        story.classList.add("story");
        
    }

    var container = $wrap($element(".stories-stats"), 
    [
      
    ])
    mainContent.prepend(container);

    
}