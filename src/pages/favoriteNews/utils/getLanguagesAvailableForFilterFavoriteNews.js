import { getNewsFilteredByCategory } from './getNewsFilteredByCategory';
import { getNewsFilteredByCountry } from './getNewsFilteredByCountry';
import { getLanguageAbbreviationsByNames } from './getLanguageAbbreviationsByNames';

export const getLanguagesAvailableForFilterFavoriteNews = (favoriteNews, selectedCountries, selectedCategories) => {
	const newsFilteredByCountry =
		selectedCountries[0] === 'all' ? favoriteNews : getNewsFilteredByCountry(favoriteNews, selectedCountries);

	const newsFilteredByCategory =
		selectedCategories[0] === 'all'
			? newsFilteredByCountry
			: getNewsFilteredByCategory(newsFilteredByCountry, selectedCategories);

	const favoriteNewsLanguages = [];
	newsFilteredByCategory.forEach(({ language }) => {
		favoriteNewsLanguages.push(language);
	});

	const uniqueFavoriteNewsLanguages = [ ...new Set(favoriteNewsLanguages) ];

	return [ 'all', ...getLanguageAbbreviationsByNames(uniqueFavoriteNewsLanguages) ];
};
