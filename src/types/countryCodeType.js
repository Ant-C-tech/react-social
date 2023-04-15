import { oneOf } from "prop-types";

import { COUNTRIES_DATA } from "@constants";

export const countryCodeType = oneOf(Object.keys(COUNTRIES_DATA));
