import { Background } from "../../scripts/background.js";
import { $element, decorateDivisions } from "../../scripts/helpers.js";
import { addArrowButton } from "../button/button.js";
const SLIDE_TIME = 7000;
const ANIMATION_TIME = 250;

const carouselProperties = {
  slides: [],
};

export default function decorate($block) {
  $block.classList.add("full-bleed");

  //Adds everything for the scroll tip
  let scrollHintContainer = document.createElement("div");
  scrollHintContainer.classList.add("scroll-tip-container");
  $block.parentNode.insertBefore(scrollHintContainer, $block.nextSibling)
  const $carousel = $block.querySelectorAll(":scope > div");
  let scrollHintContent = document.createElement("h2");
  scrollHintContent.innerHTML = "Scroll Down";
  let scrollHintChevron = document.createElement("div");
  scrollHintChevron.classList.add("chevron-down")
  scrollHintContent.classList.add("scroll-tip-content");
  scrollHintContainer.append(scrollHintContent);
  scrollHintContainer.append(scrollHintChevron);


  var i = 0;

  const length = Object.entries($carousel).length;

  for (const slide of $carousel) {
    const { properties } = decorateDivisions(slide, null, { level: "child" });
    carouselProperties.slides.push(properties);
    if ((i + 1) === length) {
      /**
       * Currently the last slide is a depreciated carousel__actions div,
       * remove this when its removed from the doc
       */
      slide.remove()
      break;
    } else if (i === 0) {
      slide.classList.add("carousel__item--visible", "firstChild");
    }
    i++;
    if (i === 1) {
      document.querySelector("body").classList.add("slide-1");
    }
    slide.classList.add("carousel__item");
    slide.querySelector("div:nth-child(1)").classList.add("image");
    slide.querySelector("div:nth-child(2)").classList.add("number");

    /* Add class names and remove ids from h2 and h3 on slides: */
    let rightSide = slide.querySelector("div:nth-child(2)");
    let tagLink = rightSide.querySelector("p:first-of-type")
    tagLink.classList.add('tag-link');
    tagLink.innerHTML = tagLink.innerHTML.replace(/[A-Za-z ]+/gm, '<span class="tag">$&</span>')
    let header3 = rightSide.querySelector("h3");
    rightSide.querySelector("h2").removeAttribute('id');
    header3.removeAttribute('id');
    header3.classList.add('dek-3');
  }

  const actions = document.createElement("div");
  actions.classList.add("carousel__actions")

  const prevDiv = addArrowButton('prev')
  const nextDiv = addArrowButton('next')

  actions.append(prevDiv)
  actions.append(nextDiv)

  $block.append(actions)

  let slidePosition = 0;
  const slides = document.getElementsByClassName('carousel__item');
  let next = document.getElementsByClassName('carousel__button--next');
  let prev = document.getElementsByClassName('carousel__button--prev');
  const totalSlides = slides.length;

  function applySlide() {
    applyColor(slidePosition);
  }

  function updateSlidePosition() {
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('carousel__item--visible')) {
        slides[i].classList.add('opacity-zero');
        setTimeout(() => {
          slides[i].classList.remove('carousel__item--visible', "visible-animation-rev", "visible-animation");
          slides[i].classList.remove('opacity-zero');
        }, ANIMATION_TIME)

      }

      if (i === slidePosition) {
        setTimeout(() => {
          slides[i].classList.add('carousel__item--visible', 'visible-animation');
        }, ANIMATION_TIME);

      }
    }
    applySlide();
  }
  function updateSlidePositionRev() {
    for (let i = 0; i < slides.length; i++) {
      if (slides[i].classList.contains('carousel__item--visible')) {
        slides[i].classList.add('opacity-zero-rev');
        setTimeout(() => {
          slides[i].classList.remove('carousel__item--visible', "visible-animation-rev", "visible-animation");
          slides[i].classList.remove('opacity-zero-rev');
        }, ANIMATION_TIME);

      }

      if (i === slidePosition) {
        setTimeout(() => {
          slides[i].classList.add('carousel__item--visible', "visible-animation-rev");
        }, ANIMATION_TIME);

      }
    }


    applySlide();

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
    updateSlidePositionRev();
  }

  function stopAutoMode() {
    if (autoInterval) {
      clearInterval(autoInterval);
      autoInterval = null;
    }
  }

  let autoInterval = setInterval(() => {
    moveToNextSlide();
  }, SLIDE_TIME);

  var timeout = null;

  next[0].addEventListener("click", function () {
    if (timeout)
      return

    clickTimeout();
    stopAutoMode();
    moveToNextSlide();
  });

  prev[0].addEventListener("click", function () {
    if (timeout)
      return

    clickTimeout();
    stopAutoMode();
    moveToPrevSlide();
  });

  function clickTimeout() {
    timeout = window.setTimeout(function () {
      window.clearTimeout(timeout);
      timeout = null;
    }, ANIMATION_TIME);
  }

  applySlide();


  // if(myStr.innerText > 13){
    //   myStr.innerText = myStr.innerText.substring(0,13) + '...'
    // }



    // var carouselBlock = document.querySelector('.carousel.block')
    // for( var num = 0; num < carouselBlock.childElementCount; num++){


    //   var myStr = document.querySelector('.carousel h2')

    //   var test = carouselBlock.children[num].classList

    //   console.log(test);

    //   if(test.classList.contains('.carousel__item--visible')){
    //     
    //   }
    //   if(myStr.innerText > 13){
    //     myStr.innerText = myStr.innerText.substring(0,13) + '...'
    //   }
    // }

    // var carouselItem = document.querySelectorAll('.carousel__item')
    // console.log(carouselItem);


    var myStr = document.querySelectorAll('.carousel h2')
    for(let h2Index = 0; h2Index < myStr.length; h2Index++){
      if(myStr[h2Index].innerText.length > 25){
        myStr[h2Index].innerText = myStr[h2Index].innerText.substring(0,25) + '...'
      }
      console.log(myStr[index].innerText);

    }



    // let maxLength = 13
    // let test = document.querySelector('.carousel__item--visible .number h2')
    // if(test.innerText.length > maxLength){

    //   test.innerText = test.innerText.substring(0,maxLength) + '...'
    // }




}

function applyColor(slideIndex) {
  Background.setColor(carouselProperties.slides[slideIndex].background);
}