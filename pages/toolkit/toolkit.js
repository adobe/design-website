import { $wrap, $element, $remainder } from "../../scripts/helpers.js";

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
    document.querySelector("body > main > div > div > div.toolkit-page-content > p").classList.add('big-red-text')
    var allArticles = document.querySelectorAll("body > main > div > div > div.toolkit-page-content > div")
    allArticles.forEach(article => {
      article.classList.add("js-scroll")
      article.classList.add("fade-in")
    })

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
      console.log("SCROLLING")
      scrollElements.forEach((element) => {
        if (elementInView(element, 1.35)) {
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