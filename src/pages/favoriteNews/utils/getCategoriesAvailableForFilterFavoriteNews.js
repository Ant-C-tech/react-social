import { getNewsFilteredByCountry } from './getNewsFilteredByCountry';
import { getNewsFilteredByLanguage } from './getNewsFilteredByLanguage';

export const getCategoriesAvailableForFilterFavoriteNews = (favoriteNews, selectedCountries, selectedLanguages) => {
	const newsFilteredByCountry =
		selectedCountries[0] === 'all' ? favoriteNews : getNewsFilteredByCountry(favoriteNews, selectedCountries);

	const newsFilteredByLanguage = selectedLanguages[0] === 'all' ?
      newsFilteredByCountry :
      getNewsFilteredByLanguage(newsFilteredByCountry, selectedLanguages)

	const favoriteNewsCategories = [];
	newsFilteredByLanguage.forEach(({ category }) => {
		favoriteNewsCategories.push(...category);
	});

	return [ 'all', ...[ ...new Set(favoriteNewsCategories) ] ];
};
