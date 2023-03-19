import { oneOf } from "prop-types";

import { COUNTRIES_DATA, CATEGORIES_DATA, LANGUAGES_DATA } from "@constants";

export const selectOptionType = oneOf([
    ...Object.keys(COUNTRIES_DATA),
    ...Object.keys(CATEGORIES_DATA),
    ...Object.keys(LANGUAGES_DATA),
]);
