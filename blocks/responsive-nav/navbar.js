import { LOG_INFO } from "karma/lib/constants";
import { decorateDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
   const $people = $block.querySelectorAll(':scope > div');
   for (const person of $people) {
       const { properties } = decorateDivisions(person, null, { level: "child" });


   }
}