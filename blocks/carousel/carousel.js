import { Background } from "../../scripts/background.js";
import { $wrap, $element, decorateDivisions, decorateTagLink,propsFromBlockLink } from "../../scripts/helpers.js";
import { addArrowButton } from "../button/button.js";
const SLIDE_TIME = 7000;
const ANIMATION_TIME = 250;

const carouselProperties = {
  slides: [],
};

export default async function decorate($block) {
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
    /*
     * Helper function for changing the doc content while we are still have old structure
     * Remove once we update the doc
     */
    convertSlideToUseProperties(slide)

    //It might be better to just use propsFromBlockLink function here instead of propsFromLinks
    let props = await propsFromBlockLink(slide, {
      path: 'path',
      hed: 'title',
      dek: 'description',
      image: 'image',
      background: { field: "color", default: "red" },
      textcolor: { field: "textcolor", default: "white" },
      tag: { field: 'tags', default: '' },
    });
    const { properties } = decorateDivisions(slide, null, { level: "child" });
    Object.assign(props, properties );
    carouselProperties.slides.push(props);

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
    slide.classList.add("carousel__item");
    slide.querySelector("div:nth-child(1)").classList.add("image");

    /*
    
    slide.querySelector("div:nth-child(2)").classList.add("number");

     // Add class names and remove ids from h2 and h3 on slides: 
    let rightSide = slide.querySelector("div:nth-child(2)");
    let tag = rightSide.querySelector("p:first-of-type")
    tag.innerText = tag.innerText.replace('#', '')
    let tagLink = decorateTagLink($element("p", ['#', $element('span.tag', tag.innerText)]), tag.innerText.replaceAll(' ', '-'))
    rightSide.prepend(tagLink)
    tag.remove();
    let header3 = rightSide.querySelector("h3");
    rightSide.querySelector("h2").removeAttribute('id');
    header3.removeAttribute('id');
    header3.classList.add('dek-3'); */
    
    let rightSide = $element(".number")
    let tag = decorateTagLink($element("p", ['#', $element('span.tag', props.tag)]), props.tag.replaceAll(' ', '-'))
    let hed = $element("h2", props.hed)
    let dek = $element("h3.dek-3", props.dek)
    let author = $element("p", props.author)

    slide.append($wrap(rightSide, [tag, hed, dek, author])) 
    if(!!props.position){
      rightSide.append($element("p", props.position))
    }
   
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
  let prev = document.getElementsByClassName('carousel__button--next');
  let next = document.getElementsByClassName('carousel__button--prev');
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
    moveToPrevSlide();
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
      if(myStr[h2Index].innerText.length > 50){
        myStr[h2Index].innerText = myStr[h2Index].innerText.substring(0,25) + '...'
      }
      console.log(myStr[h2Index].innerText);

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


//Function for testing building of carousel while I cant change the doc
function convertSlideToUseProperties(slide){

  let imageSection = slide.querySelector("div:nth-child(1)")
  let rawSection = slide.querySelector("div:nth-child(2)")
  let propSection = slide.querySelector("div:nth-child(3)")
  
  if(!imageSection || !rawSection || !propSection)
    return

  if(!rawSection.innerHTML)
    return

  let tag = rawSection.querySelector(":nth-child(1)")
  let hed = rawSection.querySelector(":nth-child(2)")
  let dek = rawSection.querySelector(":nth-child(3)")
  let author = rawSection.querySelector(":nth-child(4)")
  let position = rawSection.querySelector(":nth-child(5)")
  
  propSection.append($element('p', `Tag: ${tag.innerHTML.replaceAll('#', ' ').toUpperCase()}`))
  propSection.append($element('p', `hed: ${hed.innerHTML}`))
  propSection.append($element('p', `dek: ${dek.innerHTML}`))
  propSection.append($element('p', `author: ${author.innerHTML}`))
  if(!!position){
    propSection.append($element('p', `position: ${position.innerHTML}`))
  }

  rawSection.remove()
}