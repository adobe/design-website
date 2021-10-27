import { $element, $wrap } from "../../scripts/helpers.js";
import { fetchIndex } from "../../scripts/queries.js";
let index;

export default async function decorator($main) {
    if (!index) {
        index = await fetchIndex();
    }
    $main.classList.add("stories-index-view")

    const $target = $main.querySelector(":scope > div > div");
    const $thinkDifferent = document.querySelector(".think-differently");
    const $results = $element(".stories");
    const $loadMoreButton = $element(".load-more-stories", "Load More");
    $target.append( $wrap($element('.content'), [$results, $loadMoreButton, $thinkDifferent]));
    index.stories.data.forEach(story => {
            $results.append(buildStory(story));
    });

    $loadMoreButton.addEventListener("click", function () {
        //TODO: Fix this once we filter stories
        index.stories.data.forEach(story => {
            $results.append(buildStory(story));
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
                ]),
                $element("p.tag", "#LEADING DESIGN"),
            ]),
            $element(".story-text", [
                $element("h2.story-header", 'From mind to canvas' ),
                $element("h3", "Creating art with synthesia"),
                $element("p.author", "Laura Herman"),
                $element("p.position", "User Experience Researcher")
            ])
        ]),
    ]);
}