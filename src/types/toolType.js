import { oneOf } from "prop-types";

import { HIGHLIGHTERS } from "@constants";

export const toolType = oneOf([
    ...HIGHLIGHTERS.map((highlighter) => highlighter.name),
    "note-creator",
]);
