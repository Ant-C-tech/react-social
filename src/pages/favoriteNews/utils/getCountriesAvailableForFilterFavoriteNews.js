import { getCountryCodesByNames } from '../../../utils/getCountryCodesByNames';
import { getNewsFilteredByCategory } from './getNewsFilteredByCategory';
import { getNewsFilteredByLanguage } from './getNewsFilteredByLanguage';

export const getCountriesAvailableForFilterFavoriteNews = (favoriteNews, selectedCategories, selectedLanguages) => {
	const newsFilteredByCategory =
		selectedCategories[0] === 'all' ? favoriteNews : getNewsFilteredByCategory(favoriteNews, selectedCategories);

	const newsFilteredByLanguage =
		selectedLanguages[0] === 'all'
			? newsFilteredByCategory
			: getNewsFilteredByLanguage(newsFilteredByCategory, selectedLanguages);

	const favoriteNewsCountryNames = [];
	newsFilteredByLanguage.forEach(({ country }) => {
		favoriteNewsCountryNames.push(...country);
	});

	const uniqueFavoriteNewsCountryNames = [ ...new Set(favoriteNewsCountryNames) ];

	return [ 'all', ...getCountryCodesByNames(uniqueFavoriteNewsCountryNames) ];
};
