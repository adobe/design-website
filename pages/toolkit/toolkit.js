import {$wrap, $element, $remainder} from "../helpers.js";

export default function decorate($main) {
    var toolkit = document.querySelector("body > main");
    toolkit.classList.add("toolkit");
    var mainContent = $main.querySelector(".section-wrapper > div");
    var container = $wrap($element(".toolkit-header"), 
    [
      document.querySelector("#our-toolkit"),
      document.querySelector("#the-ideas-systems-and-tools-that-guide-our-thinking-our-processes-and-our-designs"),
    ])
    mainContent.prepend(container);
    var remainder = $remainder(mainContent, ".toolkit-header");
    var pageContent = $wrap($element(".toolkit-page-content"), remainder)
    mainContent.append(pageContent);

    // toolkit.forEach(t => {
    //   if( t.querySelector("p") ) {
    //     t.classList.add("article-picture");
    //   }
    // });
}