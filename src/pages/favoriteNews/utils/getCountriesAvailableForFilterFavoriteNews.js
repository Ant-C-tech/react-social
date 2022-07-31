import { getCountryCodesByNames } from '../../../utils/getCountryCodesByNames';

export const getCountriesAvailableForFilterFavoriteNews = (favoriteNews) => {
	const favoriteNewsCountryNames = [];
	favoriteNews.forEach(({ country }) => {
		favoriteNewsCountryNames.push(...country);
	});

	const uniqueFavoriteNewsCountryNames = [ ...new Set(favoriteNewsCountryNames) ];

	return [
		'all',
		...getCountryCodesByNames(uniqueFavoriteNewsCountryNames),
	];
};
