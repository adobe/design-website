import { $element, $wrap, decorateTagLink } from "../../scripts/helpers.js";
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
    const allStories = index.stories.data;

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

    function appendStories(stories, count = 6){
        
        for(let i = 0; i<count && storyCount<stories.length;){
            let story = stories[storyCount]
            $results.append(buildStory(story));
            i++;
            storyCount++;
        }
    }
}


function buildStory( story ) {
    const mediaAttr = "(max-width: 400px)";

    var storyTag = story.path.split('/')[2];
    return $element(".story.block", [
        $element("a.link", { attr: { href: story.path } }, [
            $element(".image", [
                $element("picture", [
                    $element("source", { attr: { media: mediaAttr, srcset: story.image }}),
                    $element("img", { attr: { src: story.image } }),
                ])
            ]),
            $element(".story-text", [
                decorateTagLink($element("p.tag", ['#', $element("span", storyTag.toUpperCase().replaceAll('-', ' '))]), storyTag),
                $element("h2.story-header", story.title || "[TITLE MISSING]" ),
                $element("h3", story.subtitle || "[SUBTITLE MISSING]"),
                $element("p.author", story.author || "[AUTHOR MISSING]"),
                $element("p.position", story.position || "[POSITION MISSING]")
            ])
        ]),
    ]);
}