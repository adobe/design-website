import { processDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
  const $carousel = $block.querySelectorAll(":scope > div");
  
  
  const length = Object.entries($carousel).length;
  var i = 0;

  for(const slide of $carousel) {
    const { properties } = processDivisions(slide, null, { level: "child" });
    if ((i + 1) === length) {
      console.log(i)
      console.log(length)
      slide.classList.add("carousel__actions");
      slide.querySelector("body > main > div > div > div.carousel.block > div:nth-child(6) > div:nth-child(1)").classList.add("carousel__button--prev");
      slide.querySelector("body > main > div > div > div.carousel.block > div:nth-child(6) > div:nth-child(2)").classList.add("carousel__button--next");
      break;
    } else if (i === 0) {
      slide.classList.add("carousel__item--visible");
    }
    i++;

    slide.classList.add("carousel__item");
    slide.querySelector("div:nth-child(1)").classList.add("image");
    slide.querySelector("div:nth-child(2)").classList.add("number");
    // slide.querySelector("div:nth-child(2) > p").classList.add('tag-link');
    // slide.querySelector('h2').classList.add('title');
    // slide.querySelector('p:last-child').classList.add('author');
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