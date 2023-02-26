import { DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS } from "@constants";

export const getCategoriesObjectWithIcons = (
    categoriesAvailableForFilterFavoriteNews
) => {
    const actualizatedCategoriesObject = {};

    categoriesAvailableForFilterFavoriteNews.forEach((category) => {
        actualizatedCategoriesObject[category] =
            DEFAULT_CATEGORIES_AVAILABLE_FOR_FILTERING_NEWS[category];
    });

    return actualizatedCategoriesObject;
};
