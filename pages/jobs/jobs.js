import {$wrap, $element, $remainder} from "../../scripts/helpers.js";

export default function decorate($main) {
    var jobs = document.querySelector("body > main");
    jobs.classList.add("jobs")
    /* jobs.forEach(t => {
      if( t.querySelector("p") ) {
        t.classList.add("article-picture");
      }
    }); */

    var content = jobs.querySelector("div > div")

    const headDiv = $element(".head-content")
    const jobsBlockContainer = $element(".jobs-block-container")

    let pageSection = 0;

    content.querySelectorAll("div>*").forEach(element =>{
      switch(pageSection){
        case 0:
          if(element.nodeName === "DIV")
            break;
          pageSection++;
        case 1:
          if(element.nodeName !== "H2"){
            headDiv.appendChild(element)
            break;
          }
          pageSection++;
        case 2:
          jobsBlockContainer.appendChild(element)
          break;
      }
    })
    var bodyContent = $wrap($element(".content"), [headDiv, jobsBlockContainer])
    content.append(bodyContent)


    const jobsContainer = $element(".jobs-container")
    let jobCategory = $element(".job-category")
    let jobListings = $element(".job-listings")

    let listing = 0;
    jobsBlockContainer.querySelectorAll("*").forEach(element =>{
      if(listing !== 0 && element.nodeName === "H2"){
        jobCategory.append(jobListings)
        jobsContainer.append(jobCategory)

        jobCategory = $element(".job-category")
        jobListings = $element(".job-listings")
      }
      
      if(element.nodeName === "H2"){
        jobCategory.append(element)
        listing++
      }else
        jobListings.append(element)
    })

    jobsBlockContainer.appendChild(jobsContainer)
}