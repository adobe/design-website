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
    jobsBlockContainer.querySelectorAll(":scope > *").forEach(element =>{
      if(listing !== 0 && element.nodeName === "H2"){
        jobCategory.append(jobListings)
        jobsContainer.append(jobCategory)

        jobCategory = $element(".job-category")
        jobListings = $element(".job-listings")
      }
      
      if(element.nodeName === "H2"){
        jobCategory.id = element.id+"-block"
        jobCategory.append(element)
        listing++
      }else
        jobListings.append(element)
    })

    jobsBlockContainer.appendChild(jobsContainer)
    var dummyJobs = [
      {
        title: "Sr Experience Designer",
        location: "San Francisco",
        what: "Acrobat | Permanent",
        section: "Experience Design",
        link: "/"
      },
      {
        title: "Sr Content Strategist",
        location: "Los Angeles",
        what: "Acrobat | Permanent",
        section: "Content Strategy",
        link: "/"
      }, 
      {
        title: "Jr Team Operator",
        location: "Salt Lake City",
        what: "Acrobat | Permanent",
        section: "Team Operations",
        link: "/"
      }, 
      {
        title: "Jr Design Operator",
        location: "Orem",
        what: "Acrobat | Permanent",
        section: "Design Operations",
        link: "/"
      }, 
      {
        title: "Prototyping and Engineering Intern",
        location: "New York City",
        what: "Acrobat | Permanent",
        section: "Prototyping and Engineering",
        link: "/"
      }, 
      {
        title: "Research and Strategy Intern",
        location: "New York City",
        what: "Acrobat | Permanent",
        section: "Research and Strategy",
        link: "/"
      }
    ]

    var jobCategories = jobsBlockContainer.querySelectorAll(".job-listings").forEach(element=>{
      element.innerHTML = ""
      console.log(element.parentElement.id.replaceAll('-', ' '))
      dummyJobs.forEach(job=>{
        if((element.parentElement.id.replaceAll('-', ' ').includes(job.section.toLowerCase())))
          element.append(buildJobListings(job))
      })
    })
}

function buildJobListings(job){
  let jobBlock = $element("a.job", [
    $element("p.job-title", job.title),
    $element("p.job-location", job.location ),
    $element("p.job-whatchamacallit", job.what ),
    $element("p.job-section", job.section )
  ])
  jobBlock.href = job.link

  return jobBlock
}