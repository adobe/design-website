import { $element, $wrap, buildStory } from "../../scripts/helpers.js";
import { lookupAuthor } from '../../scripts/authors.js';
import { fetchIndex } from "../../scripts/queries.js";
let index;

function storyMatch( pageTag, story ) {
    var storyTag = story.path.split('/')[2];

    if(!pageTag || pageTag.toLowerCase() == storyTag.toLowerCase()) {
        return true;
    } else {
        return false;
    }
}

export default async function decorator($main) {
    if (!index) {
        index = await fetchIndex();
    }
    console.log("INDEX", index)
    const allStories = index.fullindex.data.filter(data => data.path.split('/')[1] == 'stories');

    var tagFilter = location.search ? location.search.split("=")[1] : null;
    $main.classList.add("stories-index-view");

    if(tagFilter) {
        const header = document.querySelector("#all-stories");
        header.innerHTML = `#${tagFilter.replaceAll('-', ' ')}`;
    }

    let stories = allStories.filter(story => storyMatch(tagFilter, story))

    const $target = $main.querySelector(":scope > div > div");
    const $thinkDifferent = document.querySelector(".think-differently");
    const $results = $element(".stories");
    const $loadMoreButton = $element(".load-more-stories", $element("span", "LOAD MORE"))
    $target.append( $wrap($element('.content'), [$results, $loadMoreButton, $thinkDifferent]));

    let storyCount = 0;
    appendStories(stories);

    if(storyCount >= stories.length)
        $loadMoreButton.remove();

    $loadMoreButton.addEventListener("click", function () {
        appendStories(stories, 20)
        if(storyCount >= stories.length)
            $loadMoreButton.remove();
    })

    /*async*/ function appendStories(stories, count = 6){
        
        for(let i = 0; i<count && storyCount<stories.length;){
            let story = stories[storyCount]
            //let author = await lookupAuthor(story.author)
            $results.append(buildStory(story));
            i++;
            storyCount++;
        }
    }
}