
export default function decorate($block) {
   const $people = $block.querySelectorAll(':scope > div');
   for(const person of $people) {
       person.classList.add('person');
       person.querySelector("div:nth-child(1)").classList.add("image");
       person.querySelector("p:nth-child(1)").classList.add("tag");
       person.querySelector("div:nth-child(3)").classList.add("content");
       person.querySelector("div:nth-child(4)").classList.add("name");
       person.querySelector("div:nth-child(5)").classList.add("title");
   }
}