import { oneOf } from "prop-types";

import { LANGUAGES_DATA } from "@constants";

export const languageCodeType = oneOf(Object.keys(LANGUAGES_DATA));
