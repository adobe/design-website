import { decorateDivisions } from "../../scripts/helpers.js";

export default function decorate($block) {
    decorateDivisions($block, [
        ".quote",
        ".attribution",
    ]);
}