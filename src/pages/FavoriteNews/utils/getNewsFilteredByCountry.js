import { COUNTRIES_DATA } from "@constants";
import { getCodesByNames } from "./";

export const getNewsFilteredByCountry = (news, selectedCountries) => {
    const newsFilteredByCountry = [];
    news.forEach((currentNews) => {
        const currentFavoriteNewsCountryCodes = getCodesByNames(
            COUNTRIES_DATA,
            currentNews.country
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
