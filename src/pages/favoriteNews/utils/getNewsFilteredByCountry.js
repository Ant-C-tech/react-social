import { getCountryCodesByNames } from '../../../utils/getCountryCodesByNames';

export const getNewsFilteredByCountry = (favoriteNews, selectedCountries) => {
	const newsFilteredByCountry = [];
		favoriteNews.forEach((currentFavoriteNews) => {
			const currentFavoriteNewsCountryCodes = getCountryCodesByNames(currentFavoriteNews.country);
			let isCurrentNewsMatchesToFilterParameters = false;
			selectedCountries.forEach((selectedCountry) => {
				if (currentFavoriteNewsCountryCodes.includes(selectedCountry)) {
					isCurrentNewsMatchesToFilterParameters = true;
				}
			});
			if (isCurrentNewsMatchesToFilterParameters) {
				newsFilteredByCountry.push(currentFavoriteNews);
			}
    });
  return newsFilteredByCountry;
};
