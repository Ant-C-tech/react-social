import { countries } from 'country-data';

export const WORLD_COUNTRY_FLAGS = {};

countries.all.forEach((country) => {
  WORLD_COUNTRY_FLAGS[country.alpha2.toLowerCase()] = country.emoji;
});
