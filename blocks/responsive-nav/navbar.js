import { LOG_INFO } from "karma/lib/constants";
import { processDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
   const $people = $block.querySelectorAll(':scope > div');
   for (const person of $people) {
       const { properties } = processDivisions(person, null, { level: "child" });
       

   }
   console.log("HELLOOOOOOOOO");
}