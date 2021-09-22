/*
 *   Copyright (c) 2021 Busy Human LLC
 *   All rights reserved.
 *   This file, its contents, concepts, methods, behavior, and operation  (collectively the "Software") are protected by trade secret, patent,  and copyright laws. The use of the Software is governed by a license  agreement. Disclosure of the Software to third parties, in any form,  in whole or in part, is expressly prohibited except as authorized by the license agreement.
 */
export default function decorate($block) {
    const $boards = $block.querySelectorAll(":scope > div");
    for(const board of $boards) {
      board.classList.add("scoreboard");
      board.querySelector("div:nth-child(1)").classList.add("number");
      board.querySelector("div:nth-child(2)").classList.add("caption");
      board.querySelector("div:nth-child(3)").classList.add("tag");
    }
}
