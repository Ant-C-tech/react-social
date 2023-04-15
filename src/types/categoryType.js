import { oneOf } from "prop-types";

import { CATEGORIES_DATA } from "@constants";

export const categoryType = oneOf(Object.keys(CATEGORIES_DATA));
