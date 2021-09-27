import { processDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
   const $people = $block.querySelectorAll(':scope > div');
   for (const person of $people) {
       const { properties } = processDivisions(person, null, { level: "child" });
       
       person.classList.add("person");
       person.querySelector("div:nth-child(1)").classList.add("content");
       person.querySelector("p:nth-child(1)").classList.add("tag");
       person.querySelector("p:nth-child(2)").classList.add("pad");
       person.querySelector("p:nth-child(2) > picture > img").classList.add("image");
       person.querySelector("div:nth-child(2)").classList.add("name");
       person.querySelector("div:nth-child(3)").classList.add("title");
   }
}