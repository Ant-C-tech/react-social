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

export const CATEGORIES_DATA = {
    all: {
        name: "All",
        icon: "🌎",
    },
    business: {
        name: "Business",
        icon: (
            <img
                className="select-image-icon"
                src={businessIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    entertainment: {
        name: "Entertainment",
        icon: (
            <img
                className="select-image-icon"
                src={entertainmentIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    environment: {
        name: "Environment",
        icon: (
            <img
                className="select-image-icon"
                src={environmentIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    food: {
        name: "Food",
        icon: (
            <img
                className="select-image-icon"
                src={foodIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    health: {
        name: "Health",
        icon: (
            <img
                className="select-image-icon"
                src={healthIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    politics: {
        name: "Politics",
        icon: (
            <img
                className="select-image-icon"
                src={politicsIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    science: {
        name: "Science",
        icon: (
            <img
                className="select-image-icon"
                src={scienceIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    sports: {
        name: "Sports",
        icon: (
            <img
                className="select-image-icon"
                src={sportsIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    technology: {
        name: "Technology",
        icon: (
            <img
                className="select-image-icon"
                src={technologyIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    top: {
        name: "Top",
        icon: (
            <img
                className="select-image-icon"
                src={topIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
    world: {
        name: "World",
        icon: (
            <img
                className="select-image-icon"
                src={countriesIcon}
                alt="#"
                aria-hidden={true}
            ></img>
        ),
    },
};
