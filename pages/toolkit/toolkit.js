import { $wrap, $element, $remainder, $scrollAnimation } from "../../scripts/helpers.js";

export default function decorate($main) {
    var toolkit = document.querySelector("body > main");
    toolkit.classList.add("toolkit");
    var mainContent = $main.querySelector(".section-wrapper > div");
    var header = $wrap($element(".toolkit-header"), 
    [
      document.querySelector("#our-toolkit"),
      document.querySelector("#the-ideas-systems-and-tools-that-guide-our-thinking-our-processes-and-our-designs"),
    ])
    mainContent.prepend(header);
    var remainder = $remainder(mainContent, ".toolkit-header");
    var pageContent = $wrap($element(".toolkit-page-content"), remainder)
    mainContent.append(pageContent);
    document.querySelector("body > main > div > div > div.toolkit-page-content > p").classList.add('big-red-text')
    


   
    
    // Js for scrolling animations
    var allArticles = document.querySelectorAll("body > main > div > div > div.toolkit-page-content > *, .think-differently-content");
    allArticles.forEach((article, index) => {
      if(index > 1){
        article.classList.add("js-scroll")
        article.classList.add("fade-in")
      }
    })
    
    var allText = document.querySelectorAll(" body > main > div > div > div.toolkit-page-content > div > div > div.text > div, .think-differently-content > *");
    allText.forEach((article, index) => {
      console.log("DARN", article, index)
      if(index > 1){
        article.classList.add("js-scroll")
        article.classList.add("fade-in-right")
      }
    })
    

    $scrollAnimation();
}