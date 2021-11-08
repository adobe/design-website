import { $element, $wrap } from "../../scripts/helpers.js";
import { fetchIndex } from "../../scripts/queries.js";
let index;

function storyMatch( tag, story ) {
    var title = story.title;
    if(!tag || (title && title.toLowerCase().indexOf(tag) >= 0)) {
        return true;
    } else {
        return false;
    }
}

export default async function decorator($main) {
    if (!index) {
        index = await fetchIndex();
    }
    var tagFilter = location.search ? location.search.split("=")[1] : null;
    $main.classList.add("stories-index-view");

    if(tagFilter) {
        const header = document.querySelector("#all-stories");
        header.innerHTML = `#${tagFilter}`;
    }

    const $target = $main.querySelector(":scope > div > div");
    const $thinkDifferent = document.querySelector(".think-differently");
    const $results = $element(".stories");
    const $loadMoreButton = $element(".load-more-stories", "Load More");
    $target.append( $wrap($element('.content'), [$results, $loadMoreButton, $thinkDifferent]));
    index.stories.data.forEach(story => {
        if(storyMatch(tagFilter, story)) {
            $results.append(buildStory(story));
        }
    });

    $loadMoreButton.addEventListener("click", function () {
        //TODO: Fix this once we filter stories
        index.stories.data.forEach(story => {
            if(storyMatch(tagFilter, story)) {
                $results.append(buildStory(story));
            }
        });
    })
}

function buildStory( story ) {
    const mediaAttr = "(max-width: 400px)";
    if(!story.title) {
        story.title = "[TITLE_MISSING]";
    }
    return $element(".story.block", [
        $element("a.link", { attr: { href: story.path } }, [
            $element(".image", [
                $element("picture", [
                    $element("source", { attr: { media: mediaAttr, srcset: story.image }}),
                    $element("img", { attr: { src: story.image } }),
                ])
            ]),
            $element(".story-text", [
                $element("p.tag", ['#', $element("span", 'LEADING DESIGN')]),
                $element("h2.story-header", story.title || "[TITLE MISSING]" ),
                $element("h3", "Creating art with synthesia"),
                $element("p.author", "Laura Herman"),
                $element("p.position", "User Experience Researcher")
            ])
        ]),
    ]);
}