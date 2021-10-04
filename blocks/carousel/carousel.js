import { processDivisions } from "../../scripts/helpers.js";


export default function decorate($block) {
  $block.classList.add("full-bleed");
  const $carousel = $block.querySelectorAll(":scope > div");
  
  const length = Object.entries($carousel).length;
  var i = 0;

  for(const slide of $carousel) {
    const { properties } = processDivisions(slide, null, { level: "child" });
    if ((i + 1) === length) {
      slide.classList.add("carousel__actions");
      slide.querySelector("body > main > div > div > div.carousel.block > div:last-child > div:nth-child(1)").classList.add("carousel__button--prev");
      slide.querySelector("body > main > div > div > div.carousel.block > div:last-child > div:nth-child(2)").classList.add("carousel__button--next");
      break;
    } else if (i === 0) {
      slide.classList.add("carousel__item--visible");
    } 
    i++;
    if (i == 1) {
      document.querySelector("body").classList.add("slide-1")
    } else if (i === 2) {
      document.querySelector("body").classList.remove("slide-1")
      document.querySelector("body").classList.add("slide-2")
    }
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
      moveToNextSlide();
    })

    prev[0].addEventListener("click", function() {
      moveToPrevSlide();
    })

    function updateSlidePosition() {
      for (let slide of slides) {
        slide.classList.remove('carousel__item--visible');
        slide.classList.add('carousel__item--hidden');
      }

      slides[slidePosition].classList.add('carousel__item--visible');
    }

    function moveToNextSlide() {     
      if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
      } else {
        slidePosition++;
      }
      updateSlidePosition();
    }
    
    function moveToPrevSlide() {
      if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
      } else {
        slidePosition--;
      }
      updateSlidePosition();
    }
}