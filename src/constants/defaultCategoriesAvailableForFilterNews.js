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

const defaultCategories = [
    "all",
    "business",
    "entertainment",
    "environment",
    "food",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "world",
];

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

defaultCategories.forEach((category, index) => {
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
