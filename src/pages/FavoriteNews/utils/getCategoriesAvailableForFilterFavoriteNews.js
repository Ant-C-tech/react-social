import {
    getNewsFilteredByCountry,
    getNewsFilteredByKeyword,
    getNewsFilteredByLanguage,
} from "./";

export const getCategoriesAvailableForFilterFavoriteNews = (
    favoriteNews,
    selectedCountries,
    selectedLanguages,
    keyword = ""
) => {
    const newsFilteredByCountry =
        selectedCountries[0] === "all"
            ? favoriteNews
            : getNewsFilteredByCountry(favoriteNews, selectedCountries);

    const newsFilteredByLanguage =
        selectedLanguages[0] === "all"
            ? newsFilteredByCountry
            : getNewsFilteredByLanguage(
                  newsFilteredByCountry,
                  selectedLanguages
              );

    const newsFilteredByKeyword =
        keyword.length === 0
            ? newsFilteredByLanguage
            : getNewsFilteredByKeyword(newsFilteredByLanguage, keyword);

    const favoriteNewsCategories = [];
    newsFilteredByKeyword.forEach(({ category }) => {
        favoriteNewsCategories.push(...category);
    });

    return ["all", ...[...new Set(favoriteNewsCategories)]];
};
