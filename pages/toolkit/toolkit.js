import { $wrap, $element, $remainder } from "../../scripts/helpers.js";

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

    var bottomBarStats = $wrap($element(".toolkit-bottom-container-stats"), 
    [
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(3)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(4)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(5)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(6)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(7)"),
      document.querySelector("body > .toolkit > div > div > div.toolkit-bottom-container > p:nth-child(8)"),
    ])
    
    document.querySelector(".toolkit-bottom-container").append(bottomBarStats);
    
    // Js for scrolling animations
    var bottomBarElements = document.querySelectorAll("body > main.toolkit > div > div > div.toolkit-bottom-container > *");
    bottomBarElements.forEach((element,index) => {
      console.log("YO", index)
      if(index === 0){
        element.classList.add("toolkit-bottom-bar-header")
      }
      if(index === 1){
        element.classList.add("toolkit-bottom-bar-subheader")
      }
      element.classList.add("js-scroll")
      element.classList.add("fade-in")
    });
    var allArticles = document.querySelectorAll("body > main > div > div > div.toolkit-page-content > *, body > main > div > div > div.toolkit-page-content > div > div > div.text > div");
    allArticles.forEach(article => {
      article.classList.add("js-scroll")
      article.classList.add("fade-in")
    })
    var bottomContainerAnimation = document.querySelector(".toolkit-bottom-container");
    bottomContainerAnimation.classList.add("js-scroll");
    bottomContainerAnimation.classList.add("fade-in")

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

    const handleScrollAnimation = () => {
      scrollElements.forEach((element) => {
        if (elementInView(element, 1.30)) {
          displayScrollElement(element);
        } else if (elementOutofView(element)) {
          hideScrollElement(element)
        }
      })
    }
    displayScrollElement(document.querySelector("body > main > div > div > div.toolkit-page-content > div:nth-child(2)"));

    window.addEventListener("scroll", () => {
      handleScrollAnimation();
    });
}