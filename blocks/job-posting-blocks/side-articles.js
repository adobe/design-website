import { decorateDivisions, $element, getMetadata, $wrap } from "../../scripts/helpers.js";
import addButton from "../button/button.js";

const sideArticles_fake_content = [
    {
        tag_text: "AdobeLife",
        tag_link: "https://www.adobe.com",
        image: "../../resources/images/filler-image.png",
        article_tite: "Adobe achieves global gender pay parity",
        date: "July 13, 2020",
        backgroundColor: '#ff00aa',
        textColor: "#ffffff",

    },
    {
        tag_text: "AdobeLife",
        tag_link: "https://www.adobe.com",
        image: "../../resources/images/filler-image.png",
        article_tite: "Adobe achieves global gender pay parity",
        date: "July 13, 2020",
        backgroundColor: '#ffffff',
        textColor: "#000000",

    }
];


/**
 * @param {HTMLElement} $block
 */
export default async function makeSideArticlesBlock(document) {
    const $side_articles = [];
    sideArticles_fake_content.forEach(
        elm => {
            let $art_card = $element("div.artcl-card", [
                    $element("a.tag-link",`\
                        href="${elm.tag_link || ' '}" \
                        ${elm.tag_text|| 'Link'}
                    `),
                    $element("div.artcl-img", `src=${elm.img}`),
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
    return $article_container
    // document.querySelector("main > div.section-wrapper").append(
    //     $article_container
    // );
}
