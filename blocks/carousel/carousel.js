import { processDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
  const $carousel = $block.querySelectorAll(":scope > div");
  
  
  const length = Object.entries($carousel).length;
  var i = 0;

  for(const slide of $carousel) {
    const { properties } = processDivisions(slide, null, { level: "child" });
    const carouselArea = document.getElementsByClassName("button")[0]
    const newButton = document.createElement("button")

    if ((i + 1) === length) {
      slide.classList.add("carousel__actions");
      slide.querySelector("body > main > div > div > div.carousel.block > div.carousel__actions > div:nth-child(1)").classList.add("carousel__button--prev");
      slide.querySelector("body > main > div > div > div.carousel.block > div.carousel__actions > div:nth-child(2)").classList.add("carousel__button--next");
      break;
    } else if (i === 0) {
      slide.classList.add("carousel__item--visible");
    }
    i++;
    slide.classList.add("carousel__item");
    slide.querySelector("div:nth-child(1)").classList.add("image");
    slide.querySelector("div:nth-child(2)").classList.add("number");
    }


    let slidePosition = 0;
    const slides = document.getElementsByClassName('carousel__item');
    let next = document.getElementsByClassName('carousel__button--next');
    let prev = document.getElementsByClassName('carousel__button--prev');
    const totalSlides = slides.length;

    next[0].addEventListener("click", function() {
      console.log('WORK')
    })

    prev[0].addEventListener("click", function() {
      console.log('PLEASE')
    })
}