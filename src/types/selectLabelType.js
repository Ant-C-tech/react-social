import { oneOf } from "prop-types";

import { COUNTRIES_DATA, CATEGORIES_DATA, LANGUAGES_DATA } from "@constants";

export const selectLabelType = oneOf([
    COUNTRIES_DATA,
    CATEGORIES_DATA,
    LANGUAGES_DATA,
]);
