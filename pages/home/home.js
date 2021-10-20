import {$scrollAnimation} from "../../scripts/helpers.js";

export default async function decorator($main) {
    console.log("DANG",$main)
    $main.classList.add("home-view-container")
    $main.querySelectorAll(".article-card").forEach((article, index) => {
        
        article.classList.add("js-scroll");
        if(index % 2){
            article.classList.add("fade-in-right")

        } else {
            article.classList.add("fade-in-left")
        }
       
    })
    var countBy4 = 0;
    var toggle = false
    document.querySelectorAll("body > main > div > div > div > div > div.text > *").forEach((text, index) => {
        console.log("DOPE", text, index)
        text.classList.add("js-scroll");
        if(toggle){
            text.classList.add("fade-in-right")

        } else {
            text.classList.add("fade-in-left")
        }
        countBy4++;
        if(countBy4 > 3){
            countBy4 = 0;
            toggle = !toggle;
        }
    })
    $scrollAnimation();
}