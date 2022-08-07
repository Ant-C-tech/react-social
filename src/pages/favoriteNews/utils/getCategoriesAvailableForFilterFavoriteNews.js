import { getNewsFilteredByCountry } from './getNewsFilteredByCountry';

export const getCategoriesAvailableForFilterFavoriteNews = (favoriteNews, selectedCountries) => {
	const newsFilteredByCountry =
		selectedCountries[0] === 'all' ? favoriteNews : getNewsFilteredByCountry(favoriteNews, selectedCountries);

	const favoriteNewsCategories = [];
	newsFilteredByCountry.forEach(({ category }) => {
		favoriteNewsCategories.push(...category);
	});

	return [ 'all', ...[ ...new Set(favoriteNewsCategories) ] ];
};
