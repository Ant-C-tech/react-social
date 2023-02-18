import { countries } from "country-data";

export const WORLD_COUNTRY_NAMES = {};

countries.all.forEach((country) => {
    WORLD_COUNTRY_NAMES[country.alpha2.toLowerCase()] = country.name;
});
