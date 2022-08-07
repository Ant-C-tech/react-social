import { getNewsFilteredByCategory } from './getNewsFilteredByCategory';
import { getNewsFilteredByCountry } from './getNewsFilteredByCountry';
import { getLanguageAbbreviationsByNames } from './getLanguageAbbreviationsByNames';
import { getNewsFilteredByKeyword } from './getNewsFilteredByKeyword';

export const getLanguagesAvailableForFilterFavoriteNews = (
	favoriteNews,
	selectedCountries,
	selectedCategories,
	keyword,
) => {
	const newsFilteredByCountry =
		selectedCountries[0] === 'all' ? favoriteNews : getNewsFilteredByCountry(favoriteNews, selectedCountries);

	const newsFilteredByCategory =
		selectedCategories[0] === 'all'
			? newsFilteredByCountry
			: getNewsFilteredByCategory(newsFilteredByCountry, selectedCategories);

	const newsFilteredByKeyword =
		keyword.length === 0 ? newsFilteredByCategory : getNewsFilteredByKeyword(newsFilteredByCategory, keyword);

	const favoriteNewsLanguages = [];
	newsFilteredByKeyword.forEach(({ language }) => {
		favoriteNewsLanguages.push(language);
	});

	const uniqueFavoriteNewsLanguages = [ ...new Set(favoriteNewsLanguages) ];

	return [ 'all', ...getLanguageAbbreviationsByNames(uniqueFavoriteNewsLanguages) ];
};
