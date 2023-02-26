import { countries } from "country-data";

export const WORLD_COUNTRY_FLAGS = {};

countries.all.forEach((country) => {
    if (
        !Object.keys(WORLD_COUNTRY_FLAGS).includes(country.alpha2.toLowerCase())
    ) {
        WORLD_COUNTRY_FLAGS[country.alpha2.toLowerCase()] = country.emoji;
    }
});
