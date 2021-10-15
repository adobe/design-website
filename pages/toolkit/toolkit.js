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
    
    var bottomBar = $wrap($element(".toolkit-bottom-container"), 
    [
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(9)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(10)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(11)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(12)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(13)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(14)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(15)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-page-content > p:nth-child(16)")
    ])
    mainContent.append(bottomBar);
    var slashContainer = document.createElement('div');
    slashContainer.classList.add("slash-container");
    
    var stat1 = document.createElement("div")
    stat1.classList.add("stat-group")
    
    document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(3)").classList.add("toolkit-stat")
    document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(4)").classList.add("toolkit-description")
    document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(5)").classList.add("toolkit-stat")
    document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(6)").classList.add("toolkit-description")
    document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(7)").classList.add("toolkit-stat")
    document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(8)").classList.add("toolkit-description")

    var bottomBarStats = $wrap($element(".toolkit-bottom-container-stats"), 
    [
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(3)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(4)"),
      slashContainer.cloneNode(),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(5)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(6)"),
      slashContainer.cloneNode(),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(7)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(8)"),
    ])
    
    document.querySelector(".toolkit-bottom-container").append(bottomBarStats);

    // var statsWrapper = $wrap($element(".toolkit-stats-wrapper"), 
    // [
      
    //   document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(7)"),
    //   document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(8)"),
    // ])
    
    // document.querySelector(".toolkit-bottom-container-stats").append(statsWrapper);


    var bottomBarElements = document.querySelectorAll("body > main.toolkit > div > div > div.toolkit-bottom-container > *");
    bottomBarElements.forEach((element,index) => {
      if(index === 0){
        element.classList.add("toolkit-bottom-bar-header")
      }
      if(index === 1){
        element.classList.add("toolkit-bottom-bar-subheader")
      }
      element.classList.add("js-scroll")
      element.classList.add("fade-in")
    });
    
    // Js for scrolling animations
    var allArticles = document.querySelectorAll("body > main > div > div > div.toolkit-page-content > *");
    allArticles.forEach((article, index) => {
      if(index > 1){
        article.classList.add("js-scroll")
        article.classList.add("fade-in")
      }
    })
    var allText = document.querySelectorAll(" body > main > div > div > div.toolkit-page-content > div > div > div.text > div");
    allText.forEach((article, index) => {
      if(index > 1){
        article.classList.add("js-scroll")
        article.classList.add("fade-in-right")
      }
    })
    var bottomContainerAnimation = document.querySelector(".toolkit-bottom-container");
    bottomContainerAnimation.classList.add("js-scroll");
    bottomContainerAnimation.classList.add("fade-in")

    $scrollAnimation();
}