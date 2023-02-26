import React from "react";
import {
    businessIcon,
    environmentIcon,
    entertainmentIcon,
    foodIcon,
    healthIcon,
    politicsIcon,
    scienceIcon,
    sportsIcon,
    technologyIcon,
    topIcon,
    countriesIcon,
} from "@assets";

import { DEFAULT_CATEGORIES_NAMES } from "./defaultCategoriesNames";

const iconsSrcs = [
    "all",
    businessIcon,
    entertainmentIcon,
    environmentIcon,
    foodIcon,
    healthIcon,
    politicsIcon,
    scienceIcon,
    sportsIcon,
    technologyIcon,
    topIcon,
    countriesIcon,
];

export const DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS = {};

DEFAULT_CATEGORIES_NAMES.forEach((category, index) => {
    const Icon = () => (
        <img
            src={iconsSrcs[index]}
            alt="#"
            style={{
                width: "40px",
                paddingRight: "10px",
                objectFit: "contain",
            }}
            aria-hidden={true}
        />
    );
    DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS[category] = <Icon />;
});
