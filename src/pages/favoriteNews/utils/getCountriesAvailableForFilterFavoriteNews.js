import { getCountryCodesByNames } from '../../../utils/getCountryCodesByNames';
import { getNewsFilteredByCategory } from './getNewsFilteredByCategory';

export const getCountriesAvailableForFilterFavoriteNews = (favoriteNews, selectedCategories) => {

		const newsFilteredByCategory =
		selectedCategories[0] === 'all'
			? favoriteNews
			: getNewsFilteredByCategory (favoriteNews, selectedCategories);

	const favoriteNewsCountryNames = [];
	newsFilteredByCategory.forEach(({ country }) => {
		favoriteNewsCountryNames.push(...country);
	});

	const uniqueFavoriteNewsCountryNames = [ ...new Set(favoriteNewsCountryNames) ];

	return [ 'all', ...getCountryCodesByNames(uniqueFavoriteNewsCountryNames) ];
};
