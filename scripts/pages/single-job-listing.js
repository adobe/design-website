/*
 *  Copyright (c) 2021 Busy Human LLC
 *  All rights reserved.
 *  This file, its contents, concepts, methods, behavior, and operation
 *  (collectively the "Software") are protected by trade secret, patent,
 *  and copyright laws. The use of the Software is governed by a license
 *  agreement. Disclosure of the Software to third parties, in any form,
 *  in whole or in part, is expressly prohibited except as authorized by
 *  the license agreement.
 */

export default function decorate($main) {
    var paragraphs = document.querySelectorAll("body > main > div > div > p");
    paragraphs.forEach(p => {
      if( p.querySelector("picture") ) {
        p.classList.add("article-picture");
      }
    });
    moveHeaderContent();
}

function moveHeaderContent() {
    const page = document.querySelector(".block.page");
    const header = document.querySelector(".block.header");
    const section = document.querySelector(".section-wrapper");
    const container = document.querySelector(".section-wrapper div:first-child");
    const newDiv = document.createElement("div");
    section.insertBefore(newDiv, container);

    container.classList.add("content");
    newDiv.appendChild(page);
    newDiv.appendChild(header);

    const picture = header.querySelector("picture");
    picture.classList.add("header-image");
    container.prepend(picture);
}