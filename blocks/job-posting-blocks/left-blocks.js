import { decorateDivisions, $element, getMetadata, $wrap } from "../../scripts/helpers.js";
import addButton from "../button/button.js";

const sideArticles_fake_content = [
    {
        tag_text: "AdobeLife",
        tag_link: "https://www.adobe.com",
        img: "./media_1ec0286ab799a2e6532016cdfa7eaa13ef325b24f.png?width=750&format=webply&optimize=medium",
        article_tite: "Adobe achieves global gender pay parity",
        date: "July 13, 2020",
        backgroundColor: '#ff0000',
        textColor: "#ffffff",

    },
    {
        tag_text: "AdobeLife",
        tag_link: "https://www.adobe.com",
        img: "./media_165f4f8868b26c3ffd9f1129462ad5ee2392f3222.jpeg?width=750&amp;format=webply&amp;optimize=medium",
        article_tite: "What an interview panel could tell you about the job",
        date: "December 13, 2019",
        backgroundColor: '#ffffff',
        textColor: "#000000",

    }
];


/**
 * @param {HTMLElement} $block
 */
export default async function makeSideArticlesBlock(document) {
    /* Header Block */
    const $button_apply_now = addButton(
        "Apply Now",
        ()=> {console.log( "APPLY NOW CLICKED IN HEADER OF JOB POST")},
        "dk-bkg unfilled",
        "#ffffff"
    )
    const $jobTitle = $element("h1.hed.job-title", getMetadata('job-title'));
    const $header_block = $element("div.header-block", [
        $element("div.job-header-container", [$jobTitle, $button_apply_now]),
    ]);
    /* End Header Block */
    /*  Side Articles   */
    const $side_articles = [];
    sideArticles_fake_content.forEach(
        elm => {
            let $art_card = $element("div.artcl-card", [
                    $element("a.tag-link",
                        { attr:{ href: elm.tag_link || ' ', target: "_blank"}},elm.tag_text|| 'Link'
                    ),
                    /**
                     * Set a height/width to container so that loading images
                     * don't mess up style/format
                     * */
                    $element(
                        "div.artcl-img",
                        $element(
                            "img.article_img",
                             { attr: { src: elm.img, srcset: elm.img, alt: "Placeholder "} }
                        )
                    ),
                    $element("div.artcl-title", elm.article_tite),
                    $element("div.written-date", elm.date),
                ]);
            $art_card.style.backgroundColor = elm.backgroundColor || "#ffffff";
            $art_card.style.color = elm.textColor || "inherit";
            $side_articles.push($art_card)
        }
    )

    const $article_container = $element("div.side-articles-container",
        $element("div.side-articles", $side_articles)
    )
    console.log( " MAKE SIDE ARTICLES BLOCK< TYPE: ", typeof $article_container, "\n CONTAINER: ", $article_container )


    return $element(".sticky-container", [$header_block, $article_container])


}
