/*
 *   Copyright (c) 2021 Busy Human LLC
 *   All rights reserved.
 *   This file, its contents, concepts, methods, behavior, and operation  (collectively the "Software") are protected by trade secret, patent,  and copyright laws. The use of the Software is governed by a license  agreement. Disclosure of the Software to third parties, in any form,  in whole or in part, is expressly prohibited except as authorized by the license agreement.
 */
import { $element } from "../../scripts/helpers.js";
import { fetchIndex } from "../../scripts/queries.js";
let index;

export default async function decorator($main) {
    if (!index) {
        index = await fetchIndex();
    }
    console.log("INDEX", index);

    const $target = $main.querySelector(":scope > div");
    const $thinkDifferent = document.querySelector(".think-differently");
    const $results = $element(".stories");
    $target.insertBefore( $results, $thinkDifferent);
    index.stories.data.forEach(story => {
        // story.image = "./media_1ba9edb35e737437cbc76a1f1d62944b4f1d2b135.png?width=750&amp;format=webply&amp;optimize=medium";
        $results.append(buildStory(story));
    });
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
            ]),
            $element("story-text", [
                $element("p.tag", "TAG"),
                $element("h2", story.title ),
                $element("h3", "Creating art with synthesia"),
                $element("p.author", "Laura Herman"),
                $element("p.position", "User Experience Researcher")
            ])
        ]),
    ]);
}