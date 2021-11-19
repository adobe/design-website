import {$element, $scrollAnimation } from "../../scripts/helpers.js";

export default function decorate($block){
    const thinkAboutContent = $block.querySelector("div:first-child > div:first-child")
    thinkAboutContent.classList.add("think-differently-content")
    const query = $block.querySelectorAll("div:first-child > div:first-child >*")

    query.forEach(element =>{

        if(element.nodeName === "P")
            element.innerHTML = element.innerHTML.replace(/[0-9,+]+/, '<span class="think-differently-number">$&</span>')
    })
    thinkAboutContent.append($element(".think-differently-slash.slash-1"))
    thinkAboutContent.append($element(".think-differently-slash.slash-2"))
    thinkAboutContent.append($element("a.view-jobs", { attr: { href: '/jobs/', target: "_blank"} }, "VIEW OUR JOB OPENINGS"))

    $block.classList.add("js-scroll", "fade-in")

    $scrollAnimation();
}