import { processDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
  const $carousel = $block.querySelectorAll(":scope > div");

  for(const slide of $carousel) {
    const { properties } = processDivisions(slide, null, { level: "child" });
    
    slide.classList.add("carousel__item");
    slide.querySelector("div:nth-child(1)").classList.add("image");
    slide.querySelector("div:nth-child(2)").classList.add("number");
    }
}