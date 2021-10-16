/*
 *   Copyright (c) 2021 Busy Human LLC
 *   All rights reserved.
 *   This file, its contents, concepts, methods, behavior, and operation  (collectively the "Software") are protected by trade secret, patent,  and copyright laws. The use of the Software is governed by a license  agreement. Disclosure of the Software to third parties, in any form,  in whole or in part, is expressly prohibited except as authorized by the license agreement.
 */
import { fetchIndex } from "../../scripts/queries.js";
var index;

export default async function decorator($main) {
    if (!index) {
        index = await fetchIndex();
    }
    console.log("INDEX", index);
}