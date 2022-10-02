import { getCountryCodesByNames } from '../getCountryCodesByNames';

export const getNewsFilteredByCountry = (news, selectedCountries) => {
  const newsFilteredByCountry = [];
  news.forEach((currentNews) => {
    const currentFavoriteNewsCountryCodes = getCountryCodesByNames(
      currentNews.country,
    );
    let isCurrentNewsMatchesToFilterParameters = false;
    selectedCountries.forEach((selectedCountry) => {
      if (currentFavoriteNewsCountryCodes.includes(selectedCountry)) {
        isCurrentNewsMatchesToFilterParameters = true;
      }
    });
    if (isCurrentNewsMatchesToFilterParameters) {
      newsFilteredByCountry.push(currentNews);
    }
  });
  return newsFilteredByCountry;
};
