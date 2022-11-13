import { getCountryCodesByNames } from '@utils/getCountryCodesByNames';
import { getNewsFilteredByCategory } from './getNewsFilteredByCategory';
import { getNewsFilteredByKeyword } from './getNewsFilteredByKeyword';
import { getNewsFilteredByLanguage } from './getNewsFilteredByLanguage';

export const getCountriesAvailableForFilterFavoriteNews = (
  favoriteNews,
  selectedCategories,
  selectedLanguages,
  keyword = '',
) => {
  const newsFilteredByCategory =
    selectedCategories[0] === 'all'
      ? favoriteNews
      : getNewsFilteredByCategory(favoriteNews, selectedCategories);

  const newsFilteredByLanguage =
    selectedLanguages[0] === 'all'
      ? newsFilteredByCategory
      : getNewsFilteredByLanguage(newsFilteredByCategory, selectedLanguages);

  const newsFilteredByKeyword =
    keyword.length === 0
      ? newsFilteredByLanguage
      : getNewsFilteredByKeyword(newsFilteredByLanguage, keyword);

  const favoriteNewsCountryNames = [];
  newsFilteredByKeyword.forEach(({ country }) => {
    favoriteNewsCountryNames.push(...country);
  });

  const uniqueFavoriteNewsCountryNames = [...new Set(favoriteNewsCountryNames)];
  return ['all', ...getCountryCodesByNames(uniqueFavoriteNewsCountryNames)];
};
