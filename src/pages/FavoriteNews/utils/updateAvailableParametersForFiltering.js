import {
  getCountriesAvailableForFilterFavoriteNews,
  getCategoriesAvailableForFilterFavoriteNews,
  getLanguagesAvailableForFilterFavoriteNews,
} from './';

export const updateAvailableParametersForFiltering = (
  news,
  selectedCountries,
  selectedCategories,
  selectedLanguages,
  setCountriesAvailableForFilterFavoriteNews,
  setCategoriesAvailableForFilterFavoriteNews,
  setLanguagesAvailableForFilterFavoriteNews,
) => {
  setCountriesAvailableForFilterFavoriteNews(
    getCountriesAvailableForFilterFavoriteNews(
      news,
      selectedCategories,
      selectedLanguages,
    ),
  );

  setCategoriesAvailableForFilterFavoriteNews(
    getCategoriesAvailableForFilterFavoriteNews(
      news,
      selectedCountries,
      selectedLanguages,
    ),
  );

  setLanguagesAvailableForFilterFavoriteNews(
    getLanguagesAvailableForFilterFavoriteNews(
      news,
      selectedCountries,
      selectedCategories,
    ),
  );
};
