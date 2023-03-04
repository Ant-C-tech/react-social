import { COUNTRIES_DATA } from "@constants";
import { getCountryCodesByNames } from "@utils/getCountryCodesByNames";

export const getCountriesForPrompt = (newsForPrompt) => {
    const countryCodesForPrompt = [];
    newsForPrompt.forEach((news) => {
        news.country.forEach((countryItem) => {
            countryCodesForPrompt.push(countryItem);
        });
    });
    const uniqCountryCodesForPrompt = [...new Set(countryCodesForPrompt)];

    const countriesForPrompt = uniqCountryCodesForPrompt.map((country) => {
        const countryCode = getCountryCodesByNames([country]);
        return [
            COUNTRIES_DATA[countryCode].flag,
            COUNTRIES_DATA[countryCode].name,
        ];
    });
    return countriesForPrompt;
};
