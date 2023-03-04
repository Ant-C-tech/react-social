import { COUNTRIES_DATA } from "@constants";

const countriesNameCodeObjects = {};
Object.entries(COUNTRIES_DATA).forEach((country) => {
    const countryCode = country[0];
    const countryName = country[1].name.toLowerCase();

    countriesNameCodeObjects[countryName] = countryCode;
});

export const getCountryCodesByNames = (countryNames) => {
    return [
        ...countryNames.map(
            (countryName) => countriesNameCodeObjects[countryName.toLowerCase()]
        ),
    ];
};
