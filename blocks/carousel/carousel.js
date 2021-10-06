import { processDivisions } from "../../scripts/helpers.js";

function decorateSlide(slide, i, length) {
  const { properties } = processDivisions(slide, null, { level: "child" });
  if ((i + 1) === length) {
    slide.classList.add("carousel__actions");
    slide.querySelector("body > main > div > div > div.carousel.block > div:last-child > div:nth-child(1)").classList.add("carousel__button--prev");
    slide.querySelector("body > main > div > div > div.carousel.block > div:last-child > div:nth-child(2)").classList.add("carousel__button--next");
  } else {
    slide.classList.add("carousel__item");
    slide.querySelector("div:nth-child(1)").classList.add("image");
    slide.querySelector("div:nth-child(2)").classList.add("number");
    if (i === 0) {
      slide.classList.add("carousel__item--visible");
    } 
  } 
  
}

export default function decorate($block) {
  $block.classList.add("full-bleed");
  const $carousel = $block.querySelectorAll(":scope > div");
  const $innerwrapper = document.createElement('div')
  $innerwrapper.classList.add("carousel-slide")

  const length = Object.entries($carousel).length;

  var i = 0;

  for(const slide of $carousel) {
    decorateSlide(slide, i, length)
    slide.remove()
    $innerwrapper.append(slide)
    i++;
    }

    $block.append($innerwrapper)

    let slidePosition = 0;

    const slides = document.getElementsByClassName('carousel__item');
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselItems = document.querySelectorAll('.carousel-slide .carousel__item');

    const size = carouselItems[0].clientWidth;
    console.log(carouselItems[0].scrollWidth)

    //Buttons
    let next = document.getElementsByClassName('carousel__button--next');
    let prev = document.getElementsByClassName('carousel__button--prev');


    const totalSlides = slides.length;

    //listeners
    next[0].addEventListener("click", function() {
      // moveToNextSlide();
      carouselSlide.style.transition = "transform 0.4s ease-in-out";
      slidePosition++;
      carouselSlide.style.transform = 'translateX(' + (-size * slidePosition) + 'px)';
    })

    prev[0].addEventListener("click", function() {
      // moveToPrevSlide();
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



